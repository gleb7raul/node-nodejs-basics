import { rename as fsRename, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const rename = async () => {
    const folderPath = path.resolve('files');
    const wrong = path.join(folderPath, 'wrongFilename.txt');
    const proper = path.join(folderPath, 'properFilename.md');

    try {
        await access(wrong, constants.F_OK);

        try {
            await access(proper, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        await fsRename(wrong, proper);
    } catch {
        throw new Error('FS operation failed');
    }
};

await rename();