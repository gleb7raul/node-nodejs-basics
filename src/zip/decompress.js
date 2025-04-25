import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const fileName = fileURLToPath(import.meta.url);
const folderName = dirname(fileName);

const decompress = async () => {
    const inputPath = join(folderName, 'files', 'archive.gz');
    const outputPath = join(folderName, 'files', 'fileToCompress.txt');

    const source = fs.createReadStream(inputPath);
    const destination = fs.createWriteStream(outputPath);
    const unzip = zlib.createUnzip();

    try {
        await pipeline(source, unzip, destination);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await decompress();