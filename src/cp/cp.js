import { spawn } from 'child_process';
import path from 'path';

const spawnChildProcess = async (args) => {
    const childPath = resolve('files', 'script.js');
    const child = spawn('node', [childPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);
