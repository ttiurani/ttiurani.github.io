const fs = require('fs').promises;
const fsSync = require('fs');
const { generateOgImageFromText, transcodeImage } = require('./imageUtils.cjs');

(async () => {
    // Read all of the blog metadata files, they are in order by name
    const metadataDir = __dirname + '/../.svelte-kit/blog/metadata/';
    const files = await fs.readdir(metadataDir);
    const contentPromises = files.map((file) => {
        return fs.readFile(metadataDir + file, 'utf8');
    });
    const contents = await Promise.all(contentPromises);
    const blogPostMetadata = contents.map((content) => JSON.parse(content));

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
    const generatedTranscodedImages = (await Promise.all(ogImageGenerationPromises)).filter(
        (value) => value
    );

    // Read in blog templates
    //
})();
