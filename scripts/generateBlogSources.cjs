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
            const content = await fs.readFile(path, 'utf8');
            await fs.writeFile(outputDirectory + '/' + fileName, content);
        }
    }
};

(async () => {
    // Read all of the blog metadata files, they are in order by name
    const metadataDir = __dirname + '/../.svelte-kit/blog/metadata/';
    const metadataFiles = await fs.readdir(metadataDir);
    const metadataContentPromises = metadataFiles.map((file) => {
        return fs.readFile(metadataDir + file, 'utf8');
    });
    const metadataContents = await Promise.all(metadataContentPromises);
    const blogPostMetadata = metadataContents.map((content) => JSON.parse(content));

    // Generate OpenGraph images
    const staticDir = __dirname + '/../static';
    const generatedImagesDir = staticDir + '/images/generated/';
    if (!fsSync.existsSync(generatedImagesDir)) {
        await fs.mkdir(generatedImagesDir, { recursive: true });
    }
    const ogImageGenerationPromises = blogPostMetadata.map((metadata) => {
        const path = '/blog/' + metadata.docname.substring(metadata.docname.indexOf('_') + 1);
        metadata.path = path;
        return generateOgImageFromText(
            generatedImagesDir,
            metadata.docname + '.jpg',
            __dirname + '/veteran_typewriter.ttf',
            __dirname + '/NotoSans-Regular.ttf',
            metadata.doctitle,
            'tiuraniemi.io' + path,
            '/images/generated/',
            metadata
        );
    });
    const generatedOgImages = (await Promise.all(ogImageGenerationPromises)).filter(
        (value) => value
    );

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
    const svelteBlogIndexTemplate = await fs.readFile(
        srcDir + '/svelte/routes/_blog_index_template.svelte',
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
    htmlPartialsContents.reverse();

    // Generate svelte blog posts
    const svelteRoutesDir = srcDir + '/svelte/routes';
    if (!fsSync.existsSync(svelteRoutesDir + '/blog')) {
        await fs.mkdir(svelteRoutesDir + '/blog', { recursive: true });
    }
    const svelteBlogPostPromises = htmlPartialsContents.map(async (partial) => {
        let fileContent = svelteBlogPostTemplate;
        fileContent = fileContent
            .replaceAll(/__BLOG_POST_TITLE__/g, partial.metadata.doctitle)
            .replaceAll(/__BLOG_POST_CONTENT__/g, partial.content)
            .replaceAll(/__BLOG_POST_DESCRIPTION__/g, partial.metadata.description)
            .replaceAll(/__BLOG_POST_URL__/g, 'https://tiuraniemi.io' + partial.metadata.path)
            .replaceAll(/__BLOG_POST_IMAGE__/g, 'https://tiuraniemi.io' + partial.metadata.ogImage);

        const fileContentLines = fileContent.split(/\n/);
        let finalFileContent = '';
        for (const fileContentLine of fileContentLines) {
            if (fileContentLine.trim().startsWith('<img')) {
                finalFileContent +=
                    (await createPictureTagFromImageTag(fileContentLine, partial.metadata.images)) +
                    '\n';
            } else {
                finalFileContent += fileContentLine + '\n';
            }
        }
        const filePath = svelteRoutesDir + partial.metadata.path + '.svelte';
        return await fs.writeFile(filePath, finalFileContent);
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
        svelteBlogIndexPost = svelteBlogIndexPostTemplate;
        svelteBlogIndex += svelteBlogIndexPost
            .replaceAll(/__BLOG_POST_TITLE__/g, partial.metadata.doctitle)
            .replaceAll(/__BLOG_POST_DATE__/g, partial.metadata.revdate)
            .replaceAll(/__BLOG_POST_PATH__/g, partial.metadata.path);
    }
    svelteBlogIndex += svelteBlogIndexPostfix;
    await fs.writeFile(svelteRoutesDir + '/blog/index.svelte', svelteBlogIndex);

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
    geminiPartialsContents.reverse();

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
        geminiBlogPosts += `=> ${partial.metadata.path} ${partial.metadata.revdate}: ${partial.metadata.doctitle}\n`;
    }
    let geminiBlogIndex = geminiBlogIndexTemplate.replace(/__BLOG_POSTS__/g, geminiBlogPosts);
    await fs.writeFile(geminiDistDir + '/blog/index.gmi', geminiBlogIndex);

    // Move other gemini source files and directories to the right places
    await copyFilesRecursive(srcDir + '/gemini', geminiDistDir, '.gmi');

    // Print results
    console.info(
        `Generated:\n* ${generatedOgImages.length} OpenGraphImages\n* ${generatedTranscodedImages.length} transcoded images\n* from ${svelteBlogPostResults.length} blog posts`
    );
})();
