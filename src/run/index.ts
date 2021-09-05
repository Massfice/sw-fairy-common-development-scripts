import gulp from 'gulp';
import path from 'path';
import { exec } from 'child_process';

import projectConfig from '../project.config';

const rootPath = path.join(__dirname, '..', '..');

const pm2 = (command: string, ecosystemPath: string, cb?: () => void) => {
    exec(`pm2 ${command} ${ecosystemPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(error);

            throw error;
        }

        if (stderr) {
            console.error(stderr);

            throw new Error(stderr);
        }

        if (cb) {
            cb();
        }

        console.log(stdout);
    });
};

const run = (): Promise<boolean> => {
    const ecosystemPath = path.join(__dirname, 'ecosystem.config.js');
    const runconfigPath = path.join(rootPath, 'run.config.json');

    pm2('start', ecosystemPath);

    const runConfigWatcher = gulp.watch(runconfigPath, (done) => {
        pm2('delete', `/${projectConfig.prefix}-*/`, () => {
            pm2('start', ecosystemPath);
        });

        done();
    });

    return new Promise<boolean>((resolve) => {
        process.on('SIGINT', () => {
            pm2('delete', ecosystemPath);

            runConfigWatcher.close();
            resolve(true);
        });
    });
};

export default run;
