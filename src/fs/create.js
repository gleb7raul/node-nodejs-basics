import { writeFile, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const create = async () => {
    const src = path.resolve('files');
    const filePath = path.join(src, 'fresh.txt');

    try {
        await access(filePath, constants.F_OK);
        throw new Error('FS operation failed');
    } catch(error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }

        await writeFile(filePath, 'I am fresh and young');
    }
};

await create();