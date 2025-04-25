import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const fileName = fileURLToPath(import.meta.url);
const folderName = dirname(fileName);

const compress = async () => {
    const inputPath = join(folderName, 'files', 'fileToCompress.txt');
    const outputPath = join(folderName, 'files', 'archive.gz');

    const source = fs.createReadStream(inputPath);
    const destination = fs.createWriteStream(outputPath);
    const gzip = zlib.createGzip();

    try {
        await pipeline(source, gzip, destination);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await compress();