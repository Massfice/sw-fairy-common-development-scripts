import gulp from 'gulp';
import path from 'path';
import { exec } from 'child_process';

import RunOptions from '../types/runOptions';

const pm2 = (command: string, ecosystemPath: string, flags = '') => {
    exec(`pm2 ${command} ${ecosystemPath}${flags}`, (error, stdout, stderr) => {
        if (error) {
            console.error(error);

            throw error;
        }

        if (stderr) {
            console.error(stderr);

            throw new Error(stderr);
        }

        console.log(stdout);
    });
};

const run = (options: RunOptions): Promise<boolean> => {
    const ecosystemPath = path.join(options.dirname, 'ecosystem.config.js');

    pm2('start', ecosystemPath);

    const ecosystemWatcher = gulp.watch(ecosystemPath, (done) => {
        pm2('restart', ecosystemPath, ' --update-env');

        done();
    });

    return new Promise<boolean>((resolve) => {
        process.on('SIGINT', () => {
            pm2('delete', ecosystemPath);

            ecosystemWatcher.close();
            resolve(true);
        });
    });
};

export default run;
