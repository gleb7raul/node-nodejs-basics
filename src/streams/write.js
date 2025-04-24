// After running the script, type text in the console and press Enter for each line. 
// To finish, press Ctrl + D (Unix) or Ctrl + Z then Enter (Windows) or 'command'+ D on MacOS.

import { createWriteStream } from 'fs';
import { stdout } from 'process';

const FILE_PATH = './files/fileToWrite.txt';

const write = async () => {
    const writeStream = createWriteStream(FILE_PATH);
    process.stdin.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Data has been written to the file successfully.');
        stdout.write('You can now close the program.\n');
    });

    writeStream.on('error', (error) => {
        console.error(`Error writing to file: ${error.message}`);
    });

    process.stdin.on('end', () => {
        writeStream.end();
    });
};

await write();