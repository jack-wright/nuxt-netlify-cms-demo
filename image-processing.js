const sharp = require('sharp');
const fs = require('fs');
require('dotenv').config();
const directory = process.env.IMAGE_DIRECTORY;

// Need to resize images, then convert images to webp before it resolves
// "If you resize the images, then you can be converted"

/**
 * Loop through the images inside the image directory
 * Run through the whole conversion/resize process before moving on to the next iteration
 * @param {string} method = Whether on not it is the resize or convert method
 */
function loopThrough(method) {
    // Get the length of the files 
    // so that we can run a for loop with a decrement function running alongside 
    let images = fs.readdirSync(directory);
    let imageCount = images.length;

    return new Promise(resolve => {      
        for (let i = 0; imageCount > i; i++) {
            let image = images[i]; 
            
            imageWizard(image, method).then(() => {
                next(resolve);
            });
        }
    });

    /**
     * Decrement the count for the loop once the image has been processed 
     * @param {*} resolve = the resolve from the promise 
     */
    function next(resolve) {
        imageCount--;

        if (imageCount < 1) {
            resolve('done');
        }
    }
}

/**
 * The hub for the image processing.
 * Check what process needs to be ran, run process, resolve on completion.
 * @param {*} image = the file that the loop is currently on 
 * @param {*} method = the process we want to run (resize/convert)
 */
function imageWizard(image, method) {
    // Split the image into name and format and then assign the value to vars
    let imageParts = image.split('.');
    let imageName = imageParts[0];
    let imageFormat = imageParts[1];
    let imagePath = `${directory + image}`;
    
    // Check to see whether or not the method is resize/convert and then run the process
    return new Promise(resolve => {
        if (method === 'resize') {
            let width = 500,
                height = 400,
                newFile = `${directory + imageName}-mobile.${imageFormat}`;
            // Check to see whether or not the file already exists
            if (fs.existsSync(imagePath) && !image.includes('-mobile')) {
                imageProcess(image, newFile, resolve, width, height);
            } else if(fs.existsSync(imagePath) && image.includes('-mobile')) {
                resolve('done');
            }
        } else {
            let newFile = `${directory + imageName}.webp`;
            if (!fs.existsSync(newFile)) {
                imageProcess(image, newFile, resolve);
            } else {
                resolve('done2');
            }
        }
    });
}

function imageProcess(image, newFile, resolve, width = null, height = null) {
    sharp(directory + image)
        .resize(width, height)
        .toFile(newFile)
        .then(data => {
            resolve('Done');
        })
        .catch(error => {
            console.log(error);
        });
}

// Initiate image processing
loopThrough('resize').then(() => {
    loopThrough('convert');
});
