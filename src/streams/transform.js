import { Readable, Writable } from 'stream';

const transform = async () => {
    const input = new Readable({
        read() {}
    });

    const output = new Writable({
        write(chunk, _, callback) {
            const reversedText = chunk.toString().split('').reverse().join('');
            process.stdout.write(reversedText);
            callback();
        }
    });

    process.stdin.on('data', (chunk) => {
        input.push(chunk);
    });

    process.stdin.on('end', () => {
        input.push(null);
    });

    input.pipe(output);
};

await transform();