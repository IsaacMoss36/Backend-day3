const fs = require('fs');
const file = fs.createWriteStream('./createdFileIsaac.txt'); //creates a file that can be accessed in terminal

for(let i = 0; i < 10; i++) {
    file.write('Hello my name is Isaac '); // puts text into created file
}
file.end;