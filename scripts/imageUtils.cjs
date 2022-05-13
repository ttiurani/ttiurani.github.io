const fs = require('fs').promises;
const fsSync = require('fs');
const gd = require('node-gd');
const sharp = require('sharp');

const generateOgImageFromText = (
    outputDirectory,
    fileName,
    fontPath,
    printText,
    headerText,
    urlPathPrefix,
    metadata
) => {
    return new Promise((resolve, reject) => {
        const jpgOutputFilePath = outputDirectory + fileName;
        fsSync.access(jpgOutputFilePath, (readErr) => {
            if (!readErr) {
                // We already have this file, don't regenerate
                metadata['ogImage'] = urlPathPrefix + fileName;
                resolve();
            } else {
                const SIZE_HORIZONTAL = 1200;
                const SIZE_VERTICAL = 630;
                const SIZE_PADDING = 100;
                const MAX_FONT_SIZE = 120;
                const HEADER_FONT_SIZE = 15;
                const HEADER_VERTICAL_PADDING = 50;
                const FONT_PIXEL_COEFFICIENT = 1.2;

                // Create blank new image in memory
                const img = gd.createSync(SIZE_HORIZONTAL, SIZE_VERTICAL);

                // Set background color
                img.colorAllocate(255, 255, 255);

                // Set text color
                const txtColor = img.colorAllocate(0, 0, 0);

                // Write header, always in the same place
                img.stringFT(
                    txtColor,
                    fontPath,
                    HEADER_FONT_SIZE,
                    0,
                    SIZE_PADDING,
                    HEADER_VERTICAL_PADDING,
                    headerText
                );

                // Print words
                const printTextWords = printText.split(' ');

                // Create a new array where other words try to match the longest word
                const printLines = [printTextWords[0]];
                let startIndex = 1;
                const longestAllowedLineLength = Math.max(
                    Math.floor(printText.length * (SIZE_VERTICAL / (SIZE_HORIZONTAL * 1.3))),
                    25
                );

                while (
                    startIndex < printTextWords.length &&
                    printLines[0].length + printTextWords[startIndex].length + 1 <
                        longestAllowedLineLength
                ) {
                    printLines[0] += ' ' + printTextWords[startIndex];
                    startIndex++;
                }
                const longestLineLength = printLines[0].length;

                const fontSizeHorizontally = Math.floor(
                    Math.min(
                        (SIZE_HORIZONTAL / longestLineLength) * FONT_PIXEL_COEFFICIENT,
                        MAX_FONT_SIZE
                    )
                );

                for (let i = startIndex; i < printTextWords.length; i++) {
                    const latestPrintWord = printLines[printLines.length - 1];
                    if (latestPrintWord.length + printTextWords[i].length + 1 < longestLineLength) {
                        printLines[printLines.length - 1] =
                            latestPrintWord + ' ' + printTextWords[i];
                    } else {
                        printLines.push(printTextWords[i]);
                    }
                }

                const fontSizeVertically = Math.floor(
                    Math.min(
                        (SIZE_VERTICAL - SIZE_PADDING * 2) /
                            (printLines.length * FONT_PIXEL_COEFFICIENT),
                        MAX_FONT_SIZE
                    )
                );
                const fontSize = Math.min(fontSizeHorizontally, fontSizeVertically);

                const distanceBetweenLines = Math.floor(fontSize * FONT_PIXEL_COEFFICIENT);
                const padding =
                    fontSize +
                    Math.max(
                        Math.floor((SIZE_VERTICAL - printLines.length * distanceBetweenLines) / 2),
                        SIZE_PADDING
                    );
                for (let i = 0; i < printLines.length; i++) {
                    // Render string in image
                    const yCoord = padding + i * distanceBetweenLines;
                    img.stringFT(
                        txtColor,
                        fontPath,
                        fontSize,
                        0,
                        SIZE_PADDING,
                        yCoord,
                        printLines[i]
                    );
                }

                // Write image buffer to disk
                img.saveJpeg(jpgOutputFilePath, 80)
                    .then(() => {
                        metadata['ogImage'] = urlPathPrefix + fileName;
                        resolve(jpgOutputFilePath);
                    })
                    .catch((err) => {
                        reject(err);
                    })
                    .finally(() => {
                        img.destroy();
                    });
            }
        });
    });
};

const transcodeImage = async (
    inputDirectory,
    outputDirectory,
    format,
    urlPathPrefix,
    imageMetadata
) => {
    const outputFile = imageMetadata.target
        .substring(imageMetadata.target.lastIndexOf('/') + 1)
        .replace('.jpg', '.' + format);
    await sharp(inputDirectory + imageMetadata.target)
        .toFormat(format)
        .toFile(outputDirectory + outputFile);
    imageMetadata[format] = urlPathPrefix + outputFile;
    return outputFile;
};

const createPictureTagFromImageTag = async (imageTag, imagesMetadata) => {
    const imageMetadata = imagesMetadata.find(meta => imageTag.includes(meta.target));
    let pictureTag = '<picture>';
    if (imageMetadata.avif) {
        // For avif, if the file is small enough, let's inline it
        const imageData = await fs.readFile(__dirname + '/../static' + imageMetadata.avif);
        if (imageData.byteLength < 30000) {
           pictureTag += `<source type="image/avif" srcset="data:image/avif;base64,${imageData.toString('base64')}"/>`;
        }
        pictureTag += `<source type="image/avif" srcset="${imageMetadata.avif}"/>`;
    }
    if (imageMetadata.webp) {
        pictureTag += `<source type="image/webp" srcset="${imageMetadata.webp}"/>`;
    }
    pictureTag += `${imageTag}</picture>`
    return pictureTag;
}

module.exports = {
    generateOgImageFromText,
    transcodeImage,
    createPictureTagFromImageTag,
};
