import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

// Prompt the user to input a URL
inquirer.prompt({
  type: 'input',
  name: 'url',
  message: 'Enter the URL to generate QR code:',
}).then(answers => {
  try {
    // Generate QR code from the input URL
    const uri=answers.url;
    const qrStream = qr.image(uri, { type: 'png' });
    
    // Save the QR code to a file
    const fileStream = fs.createWriteStream('qr-code.png');
    
    qrStream.pipe(fileStream);

    fileStream.on('finish', () => {
      console.log(`QR code for ${answers.url} has been generated and saved as qr-code.png`);
      fs.writeFile("url.txt",uri, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
    });

    fileStream.on('error', (error) => {
      console.error('Error writing file:', error);
    });

  } catch (error) {
    console.error('Error generating QR code:', error);
  }
  

}).catch(error => {
  console.error('Error:', error);

});
