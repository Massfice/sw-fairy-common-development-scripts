import gulp from 'gulp';
import path from 'path';
import { exec } from 'child_process';

import RunOptions from '../types/runOptions';

const run = (options: RunOptions): Promise<boolean> => {
    const ecosystemPath = path.join(options.dirname, 'ecosystem.config.js');

    // exec(`pm2 start ${ecosystemPath}`, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(error);

    //         throw error;
    //     }

    //     if (stderr) {
    //         console.error(stderr);

    //         throw new Error(stderr);
    //     }

    //     console.log(stdout);
    // });

    const ecosystemWatcher = gulp.watch(ecosystemPath, (done) => {
        console.log('Ecosystem changed');

        done();
    });

    return new Promise<boolean>((resolve) => {
        process.on('SIGINT', () => {
            console.log('Exited');

            ecosystemWatcher.close();
            resolve(true);
        });
    });
};

export default run;
