import { ImageAnnotatorClient } from '@google-cloud/vision';
const client = new ImageAnnotatorClient();
function detectFace(fileName) {
    console.log(`Running logo detection on ${fileName}`);
    client.logoDetection(fileName)
        .then(([result]) => {
        let scores = [];
        const logos = result.logoAnnotations;
        logos?.forEach((logo) => {
            if (logo.description)
                console.log(`"${logo.description}" found in in file ${fileName}`);
            if (logo.score)
                scores.push(logo.score);
        });
        const avg = scores.reduce((a, b) => a + b) / scores.length;
        console.log(`Average score for ${fileName}: ${avg}`);
    })
        .catch((err) => {
        if (err.code == 'ENOENT')
            console.error(`File ${fileName} not found`);
    });
}
/**
 * Runs logo detection on the given list of file names and logs the description and average score of each logo.
 * @param fileNames - An array of file names to run logo detection on.
 * @returns void
 */
function main(fileNames) {
    fileNames.forEach((fileName) => {
        console.log(`Running logo detection on ${fileName}`);
        client.logoDetection(fileName)
            .then(([result]) => {
            let scores = [];
            const logos = result.logoAnnotations;
            logos?.forEach((logo) => {
                if (logo.description)
                    console.log(`"${logo.description}" found in in file ${fileName}`);
                if (logo.score)
                    scores.push(logo.score);
            });
            const avg = scores.reduce((a, b) => a + b) / scores.length;
            console.log(`Average score for ${fileName}: ${avg}`);
        })
            .catch((err) => {
            if (err.code === 'ENOENT')
                console.error(`File ${fileName} not found`);
            else if (err.code == 7)
                console.error(err.details);
        });
    });
}
// Implement the async version of the above here
// Your version should not use .then and should use try/catch instead of .catch
async function mainAsync(fileNames) {
    for (const fileName of fileNames) {
        try {
            console.log(`Running logo detection on ${fileName}`);
            // Await the logo detection result
            const [detect] = await client.logoDetection(fileName);
            const logos = detect.logoAnnotations ?? [];
            const scores = [];
            // Iterate through detected logos
            for (const logo of logos) {
                if (logo.description) {
                    console.log(`"${logo.description}" found in file ${fileName}`);
                }
                if (typeof logo.score === "number") {
                    scores.push(logo.score);
                }
            }
            // Compute average score safely
            const avg = scores.length > 0
                ? scores.reduce((a, b) => a + b, 0) / scores.length
                : 0;
            console.log(`Average score for ${fileName}: ${avg}`);
        }
        catch (err) {
            if (err?.code === "ENOENT") {
                console.error(`File ${fileName} not found`);
            }
            else if (err?.code === 7) {
                console.error(err.details ?? err.message);
            }
            else {
                console.error(`Unexpected error for ${fileName}:`, err);
            }
        }
    }
}
main([
    './images/cmu.jpg',
    './images/logo-types-collection.jpg',
    './images/not-a-file.jpg'
]);
// Sleep for a second
await new Promise(r => setTimeout(r, 1000));
mainAsync([
    './images/cmu.jpg',
    './images/logo-types-collection.jpg',
    './images/not-a-file.jpg'
]);
//# sourceMappingURL=index.js.map