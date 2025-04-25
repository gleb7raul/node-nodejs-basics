import { Worker } from 'worker_threads';
import { cpus } from 'os';
import path from 'path';

const performCalculations = async () => {
    const numCores = cpus().length;
    const workers = [];

    for (let i = 0; i < numCores; i++) {
        const worker = new Worker(path.resolve('./worker.js'), { type: 'module' });

        const result = new Promise((resolve) => {
            worker.on('message', (data) => resolve({ status: 'resolved', data }));
            worker.on('error', () => resolve({ status: 'error', data: null }));
        });

        worker.postMessage(10 + i);
        workers.push(result);
    }

    const results = await Promise.all(workers);
    console.log(results);
};

await performCalculations();