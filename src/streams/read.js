import { createReadStream } from 'fs';

const FILE_PATH = './files/fileToRead.txt';

const read = async () => {
    const stream = createReadStream(FILE_PATH);

    stream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    stream.on('end', () => {
        console.log('\nFinished reading file.');
    });

    stream.on('error', (error) => {
        console.error(`Error reading file: ${error.message}`);
    });
};

await read();