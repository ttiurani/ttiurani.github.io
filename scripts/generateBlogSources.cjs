const fs = require('fs').promises;
const fsSync = require('fs');
const {
    generateOgImageFromText,
    transcodeImage,
    createPictureTagFromImageTag,
} = require('./imageUtils.cjs');

const copyFilesRecursive = async (inputDirectory, outputDirectory, allowedExtension) => {
    const files = await fs.readdir(inputDirectory);
    for (const fileName of files) {
        const path = inputDirectory + '/' + fileName;
        const stats = await fs.stat(path);
        if (stats.isDirectory()) {
            await copyFilesRecursive(
                inputDirectory + '/' + fileName,
                outputDirectory + '/' + fileName,
                allowedExtension
            );
        } else if (stats.isFile() && fileName.endsWith(allowedExtension)) {
            if (!fsSync.existsSync(outputDirectory)) {
                await fs.mkdir(outputDirectory, { recursive: true });
            }
            await fs.copyFile(path, outputDirectory + '/' + fileName);
        }
    }
};

const sortPartials = (partials) => {
    partials.reverse();
    partials.sort((a, b) => {
        if (a.metadata.updated < b.metadata.updated) {
            return 1;
        }
        if (a.metadata.updated > b.metadata.updated) {
            return -1;
        }
        return 0;
    });
};

const getFullTitle = (metadata) => {
    let subtitle = metadata.docsubtitle;
    if (subtitle) {
        return metadata.doctitle + ' (' + subtitle + ')';
    } else {
        return metadata.doctitle;
    }
}

(async () => {
    // Read all of the blog metadata files, they are in order by name
    const metadataDir = __dirname + '/../.svelte-kit/blog/metadata/';
    const metadataFiles = await fs.readdir(metadataDir);
    const metadataContentPromises = metadataFiles.map((file) => {
        return fs.readFile(metadataDir + file, 'utf8');
    });
    const metadataContents = await Promise.all(metadataContentPromises);
    const blogPostMetadata = metadataContents.map((content) => {
        const metadata = JSON.parse(content);
        const preview = metadata.docname.indexOf('_') === -1;
        let orderNumber = 0;
        let path = '';
        if (preview) {
            path = '/blog/preview-' + metadata.docname;
        } else {
            const splitIndex = metadata.docname.indexOf('_');
            orderNumber = parseInt(metadata.docname.substring(0, splitIndex).replaceAll(/0/g, ''));
            path = '/blog/' + metadata.docname.substring(splitIndex + 1);
        }
        metadata.preview = preview;
        metadata.orderNumber = orderNumber;
        metadata.path = path;
        const updated = metadata.revdate + 'T00:00:00Z';
        let published = updated;
        if (metadata.revremark) {
            let historyDates = metadata.revremark.match(/\d{4}-\d\d-\d\d/g);
            if (historyDates.length) {
                published = historyDates[0] + 'T00:00:00Z';
            }
        }
        const timeMeta =
            updated === published
                ? `Published <time datetime="${updated}">${updated.substring(0, 10)}</time>`
                : `Updated <time datetime="${updated}">${updated.substring(0, 10)}</time>, ` +
                  `originally published <time datetime="${published}">${published.substring(
                      0,
                      10
                  )}</time>`;
        metadata.updated = updated;
        metadata.published = published;
        metadata.timeMeta = timeMeta;
        return metadata;
    });

    // Validate the documents
    let isError = false;
    for (const metadata of blogPostMetadata) {
        if (!metadata.preview) {
            if (metadata['highlighted'].length !== 1) {
                console.error(
                    'Could not find exactly one highlighted inline quote from document',
                    metadata
                );
                isError = true;
            }
            if (!metadata.description && !metadata.description.length) {
                console.error('Could not find valid description from document', metadata);
                isError = true;
            }
        }
    }
    if (isError) {
        throw new Error('Errors found in AsciiDocs');
    }

    // Generate OpenGraph images
    const staticDir = __dirname + '/../static';
    const generatedImagesDir = staticDir + '/images/generated/';
    if (!fsSync.existsSync(generatedImagesDir)) {
        await fs.mkdir(generatedImagesDir, { recursive: true });
    }

    const ogImageGenerationPromises = blogPostMetadata
        .filter((metadata) => !metadata.preview)
        .map((metadata) => {
            const darkTheme = metadata.orderNumber % 2 === 0;
            return generateOgImageFromText(
                generatedImagesDir,
                metadata.docname + '.jpg',
                __dirname + '/veteran_typewriter.ttf',
                __dirname + '/NotoSans-Regular.ttf',
                '“' + metadata['highlighted'][0] + '”',
                'tiuraniemi.org' + metadata.path,
                '/images/generated/',
                darkTheme,
                metadata
            );
        });
    const generatedOgImages = (await Promise.all(ogImageGenerationPromises)).filter(
        (value) => value
    );

    // await transcodeImage(
    //     staticDir,
    //     staticDir + '/images/',
    //     'webp',
    //     '/images/',
    //     {target: '/images/profile.jpg'}
    // );
    // await transcodeImage(
    //     staticDir,
    //     staticDir + '/images/',
    //     'avif',
    //     '/images/',
    //     {target: '/images/profile.jpg'}
    // );

    // Generate alternative images from sources
    const transcodeImagePromises = [];
    for (const metadata of blogPostMetadata) {
        if (metadata.images) {
            for (const image of metadata.images) {
                transcodeImagePromises.push(
                    transcodeImage(
                        staticDir,
                        generatedImagesDir,
                        'webp',
                        '/images/generated/',
                        image
                    )
                );
                transcodeImagePromises.push(
                    transcodeImage(
                        staticDir,
                        generatedImagesDir,
                        'avif',
                        '/images/generated/',
                        image
                    )
                );
            }
        }
    }
    const generatedTranscodedImages = (await Promise.all(transcodeImagePromises)).filter(
        (value) => value
    );

    // Read in HTML blog templates
    const srcDir = __dirname + '/../src';
    const svelteBlogPostTemplate = await fs.readFile(
        srcDir + '/svelte/routes/_blog_post_template.svelte',
        'utf8'
    );
    const svelteBlogPostTsTemplate = await fs.readFile(
        srcDir + '/svelte/routes/_blog_post_template.ts',
        'utf8'
    );
    const svelteBlogIndexTemplate = await fs.readFile(
        srcDir + '/svelte/routes/_blog_index_template.svelte',
        'utf8'
    );
    const svelteBlogIndexTsTemplate = await fs.readFile(
        srcDir + '/svelte/routes/_blog_index_template.ts',
        'utf8'
    );

    // Read in HTML partials and pair them with metadata
    const htmlPartialsDir = __dirname + '/../.svelte-kit/blog/partials/';
    const htmlBlogPartialFiles = await fs.readdir(htmlPartialsDir);
    const htmlPartialsContentPromises = htmlBlogPartialFiles.map(async (fileName) => {
        const content = await fs.readFile(htmlPartialsDir + fileName, 'utf8');
        const metadata = blogPostMetadata.find((metadata) => fileName.startsWith(metadata.docname));
        return { fileName, content, metadata };
    });
    const htmlPartialsContents = await Promise.all(htmlPartialsContentPromises);
    sortPartials(htmlPartialsContents);

    // Generate svelte blog posts
    const svelteRoutesDir = srcDir + '/svelte/routes';
    for (const partial of htmlPartialsContents)  {
        if (!fsSync.existsSync(svelteRoutesDir + partial.metadata.path)) {
            await fs.mkdir(svelteRoutesDir + partial.metadata.path, { recursive: true });
        }
    }
    const svelteBlogPostPromises = htmlPartialsContents.map(async (partial) => {
        let svelteFileContent = svelteBlogPostTemplate;

        let subtitleHtml = '';
        if (partial.metadata.docsubtitle) {
           subtitleHtml =
            `<p class="subtitle" aria-roledescription="subtitle">${partial.metadata.docsubtitle}</p>`
        }
        svelteFileContent = svelteFileContent
            .replaceAll(/__BLOG_POST_TITLE__/g, partial.metadata.doctitle)
            .replaceAll(/__BLOG_POST_SUBTITLE_HTML_/g, subtitleHtml)
            .replaceAll(/__BLOG_POST_FULL_TITLE__/g, getFullTitle(partial.metadata))
            .replaceAll(/__BLOG_POST_TIME_META__/g, partial.metadata.timeMeta)
            .replaceAll(/__BLOG_POST_KEYWORDS__/g, partial.metadata.keywords)
            .replaceAll(/__BLOG_POST_CONTENT__/g, partial.content)
            .replaceAll(/__BLOG_POST_DESCRIPTION__/g, partial.metadata.description)
            .replaceAll(/__BLOG_POST_URL__/g, 'https://tiuraniemi.org' + partial.metadata.path)
            .replaceAll(
                /__BLOG_POST_IMAGE__/g,
                'https://tiuraniemi.org' + partial.metadata.ogImage
            );

        const svelteFileContentLines = svelteFileContent.split(/\n/);
        let finalSvelteFileContent = '';
        for (const svelteFileContentLine of svelteFileContentLines) {
            if (svelteFileContentLine.trim().startsWith('<img')) {
                finalSvelteFileContent +=
                    (await createPictureTagFromImageTag(svelteFileContentLine, partial.metadata.images)) +
                    '\n';
            } else {
                finalSvelteFileContent += svelteFileContentLine + '\n';
            }
        }
        const svelteFilePath = svelteRoutesDir + partial.metadata.path + '/+page.svelte';
        const tsFilePath = svelteRoutesDir + partial.metadata.path + '/+page.ts';
        return await Promise.all([
            fs.writeFile(svelteFilePath, finalSvelteFileContent),
            fs.writeFile(tsFilePath, svelteBlogPostTsTemplate),
        ]);
    });
    const svelteBlogPostResults = await Promise.all(svelteBlogPostPromises);

    // Generate blog index
    const svelteBlogIndexPrefix = svelteBlogIndexTemplate.substring(
        0,
        svelteBlogIndexTemplate.indexOf('__BLOG_POST_START__')
    );
    const svelteBlogIndexPostfix = svelteBlogIndexTemplate.substring(
        svelteBlogIndexTemplate.indexOf('__BLOG_POST_END__') + 17
    );
    const svelteBlogIndexPostTemplate = svelteBlogIndexTemplate.substring(
        svelteBlogIndexTemplate.indexOf('__BLOG_POST_START__') + 19,
        svelteBlogIndexTemplate.indexOf('__BLOG_POST_END__')
    );
    let svelteBlogIndex = svelteBlogIndexPrefix;
    for (const partial of htmlPartialsContents) {
        if (!partial.metadata.preview) {
            svelteBlogIndexPost = svelteBlogIndexPostTemplate;
            svelteBlogIndex += svelteBlogIndexPost
                .replaceAll(/__BLOG_POST_FULL_TITLE__/g, getFullTitle(partial.metadata))
                .replaceAll(/__BLOG_POST_TIME_META__/g, partial.metadata.timeMeta)
                .replaceAll(/__BLOG_POST_KEYWORDS__/g, partial.metadata.keywords)
                .replaceAll(/__BLOG_POST_PATH__/g, partial.metadata.path);
        }
    }
    svelteBlogIndex += svelteBlogIndexPostfix;
    await fs.writeFile(svelteRoutesDir + '/blog/+page.svelte', svelteBlogIndex);
    await fs.writeFile(svelteRoutesDir + '/blog/+page.ts', svelteBlogIndexTsTemplate);

    // Generate Atom feed
    const atomFeedTemplate = await fs.readFile(srcDir + '/atom/feed.atom.tpl', 'utf8');
    const atomFeedPrefix = atomFeedTemplate.substring(
        0,
        atomFeedTemplate.indexOf('__BLOG_POST_START__')
    );
    const atomFeedPostfix = atomFeedTemplate.substring(
        atomFeedTemplate.indexOf('__BLOG_POST_END__') + 17
    );
    const atomFeedEntryTemplate = atomFeedTemplate.substring(
        atomFeedTemplate.indexOf('__BLOG_POST_START__') + 19,
        atomFeedTemplate.indexOf('__BLOG_POST_END__')
    );
    let atomFeed = atomFeedPrefix;
    let latestUpdated = '';
    for (const partial of htmlPartialsContents) {
        if (!partial.metadata.preview) {
            atomFeedEntry = atomFeedEntryTemplate;
            if (partial.metadata.updated > latestUpdated) {
                latestUpdated = partial.metadata.updated;
            }
            atomFeed += atomFeedEntryTemplate
                .replaceAll(/__BLOG_POST_FULL_TITLE__/g, getFullTitle(partial.metadata))
                .replaceAll(/__BLOG_POST_UPDATED_DATE_TIME__/g, partial.metadata.updated)
                .replaceAll(/__BLOG_POST_PUBLISHED_DATE_TIME__/g, partial.metadata.published)
                .replaceAll(/__BLOG_POST_PATH__/g, partial.metadata.path)
                .replaceAll(/__BLOG_POST_DESCRIPTION__/g, partial.metadata.description);
        }
    }
    atomFeed = atomFeed.replace('__LATEST_BLOG_POST_UPDATED_DATE_TIME__', latestUpdated);
    atomFeed += atomFeedPostfix;
    await fs.writeFile(staticDir + '/feed.atom', atomFeed);

    // Read in Gemini posts and pair them with metadata
    const geminiPostsDir = __dirname + '/../.svelte-kit/blog/gemini/';
    const geminiDistDir = __dirname + '/../dist/gemini';
    const geminiPostsFiles = await fs.readdir(geminiPostsDir);
    const geminiPostsContentPromises = geminiPostsFiles.map(async (fileName) => {
        const content = await fs.readFile(geminiPostsDir + fileName, 'utf8');
        const metadata = blogPostMetadata.find((metadata) => fileName.startsWith(metadata.docname));
        return { fileName, content, metadata };
    });
    const geminiPartialsContents = await Promise.all(geminiPostsContentPromises);
    sortPartials(geminiPartialsContents);

    // Generate Gemini blog posts to the right sub-directories and add navigation to the bottom
    const geminiBlogPostTemplate = await fs.readFile(srcDir + '/gemini/blog-post.gmi.tpl', 'utf8');
    for (const partial of geminiPartialsContents) {
        const geminiBlogPostDir = geminiDistDir + partial.metadata.path;
        if (!fsSync.existsSync(geminiBlogPostDir)) {
            await fs.mkdir(geminiBlogPostDir, { recursive: true });
        }
        const geminiBlogPost = geminiBlogPostTemplate.replace(
            '__BLOG_POST_CONTENT__',
            partial.content
        );
        await fs.writeFile(geminiBlogPostDir + '/index.gmi', geminiBlogPost);
    }

    // Generate Gemini index
    let geminiBlogPosts = '';
    const geminiBlogIndexTemplate = await fs.readFile(srcDir + '/gemini/blog.gmi.tpl', 'utf8');
    for (const partial of geminiPartialsContents) {
        if (!partial.metadata.preview) {
            geminiBlogPosts += `=> ${partial.metadata.path} ${partial.metadata.revdate} - ${partial.metadata.doctitle}\n`;
        }
    }
    let geminiBlogIndex = geminiBlogIndexTemplate.replace(/__BLOG_POSTS__/g, geminiBlogPosts);
    await fs.writeFile(geminiDistDir + '/blog/index.gmi', geminiBlogIndex);

    // Move other gemini source files and directories to the right places
    await copyFilesRecursive(srcDir + '/gemini', geminiDistDir, '.gmi');

    // Move images to gemini, only jpg for now.
    await copyFilesRecursive(staticDir, geminiDistDir, '.jpg');

    // Generate cache pre-warm script
    const scriptDistDir = __dirname + '/../dist/scripts';
    if (!fsSync.existsSync(scriptDistDir)) {
        await fs.mkdir(scriptDistDir);
    }
    let warmCacheScriptContent = '#!/bin/bash\n';
    warmCacheScriptContent += 'set -euo pipefail\n';
    const curlCommandPrefix =
        "curl --fail-with-body -H 'Accept-Encoding: gzip, deflate, br' --output /dev/null --silent --show-error https://tiuraniemi.org";
    warmCacheScriptContent += `${curlCommandPrefix}\n`;
    warmCacheScriptContent += `${curlCommandPrefix}/work\n`;
    warmCacheScriptContent += `${curlCommandPrefix}/stats\n`;
    warmCacheScriptContent += `${curlCommandPrefix}/blog\n`;
    warmCacheScriptContent += `${curlCommandPrefix}/feed.atom\n`;
    for (const metadata of blogPostMetadata) {
        warmCacheScriptContent += `${curlCommandPrefix}${metadata.path}\n`;
    }
    await fs.writeFile(scriptDistDir + '/warm-cache.sh', warmCacheScriptContent);

    // Print results
    console.info(
        `Generated:\n* ${generatedOgImages.length} OpenGraphImages\n* ${generatedTranscodedImages.length} transcoded images\n* from ${svelteBlogPostResults.length} blog posts`
    );
})();
