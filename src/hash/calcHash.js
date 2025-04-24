import { createReadStream } from 'fs';
import { createHash } from 'crypto';

const FILE_PATH = './files/fileToCalculateHashFor.txt';

const calculateHash = async () => {
    const hash = createHash('sha256');
    const stream = createReadStream(FILE_PATH);

    stream.on('data', (data) => {
        hash.update(data);
    });

    stream.on('end', () => {
        console.log(`SHA256 hash of ${FILE_PATH} is: ${hash.digest('hex')}`);
    });

    stream.on('error', (err) => {
        console.error(`Error reading file: ${err.message}`);
    });
};

await calculateHash();
