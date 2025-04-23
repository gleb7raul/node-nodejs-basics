import { readdir, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const list = async () => {
    const folderPath = path.resolve('files');

    try {
        await access(folderPath, constants.F_OK);
        const files = await readdir(folderPath);
        console.log(files);
    } catch {
        throw new Error('FS operation failed');
    }
};

await list();