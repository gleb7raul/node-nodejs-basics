import fs from 'fs/promises';
import path from 'path';

const copy = async () => {
    const src = path.resolve('files');
    const dest = path.resolve('files_copy');

    try {
        const srcState = await fs.stat(src);

        if(!srcState.isDirectory()) {
            throw new Error();
        }

        try {
            await fs.access(dest);
            throw new Error();
        } catch {}

        const copyFolder = async (from, to) => {
            await fs.mkdir(to);
            const files = await fs.readdir(from, {withFileTypes: true})

            for(const file of files) {
                const fromPath = path.join(from, file.name);
                const toPath = path.join(to, file.name);

                if(file.isDirectory()) {
                    await copyFolder(fromPath, toPath);
                } else {
                    await fs.copyFile(fromPath, toPath);
                }
            }
        }

        await copyFolder(src, dest);
    } catch(error) {
        throw new Error('FS operation failed');
    }
};

await copy();
