
const fs = require('fs');
const crypto = require('crypto');

const file = fs.createWriteStream('./PlainText.txt')
const fileName = 'plainText.txt';
const algorithm = 'aes-192-cbc';
const password = 'This will be encrypted';

file.write(password);
file.end;

const key = crypto.scryptSync(password, 'salt', 24);

const iv = Buffer.alloc(16,0);

function encryptFunc() {
    const inFile = fs.createReadStream(fileName);

    const outFile = fs.createWriteStream(fileName + '.out');
    const encrypt = crypto.createCipheriv(algorithm, key, iv);

    inFile.pipe(encrypt).pipe(outFile);
}

function decryptFunc() {
    const inFile2 = fs.createReadStream(fileName + '.out');
    
    const outFile2 = fs.createWriteStream(fileName + '.out2');
    const decrypt = crypto.createDecipheriv(algorithm, key, iv);

    inFile2.pipe(decrypt).pipe(outFile2);
}

let temp = process.argv;
if(temp[2].toLowerCase() == 'encrypt') {
    encryptFunc();
} else if (temp[2].toLowerCase() == 'decrypt') {
    decryptFunc();
} else {
    console.log('Enter valid parameter');
}
