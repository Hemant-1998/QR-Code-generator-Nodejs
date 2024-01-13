/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
"use strict";
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import util from "util";

const writeFilePromise = util.promisify(fs.writeFile);

const generateQRCode = async function () {
  try {
    const answers = await inquirer.prompt([
      {
        message: "Type in your URL: ",
        name: "URL",
      },
    ]);

    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    await writeFilePromise("URL.txt", url);
    console.log(`The file has been created.`);
  } catch (err) {
    console.error(err.message);
  }
};

generateQRCode();
