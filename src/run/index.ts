import gulp from 'gulp';
import path from 'path';
import { exec } from 'child_process';

const rootPath = path.join(__dirname, '..', '..');

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

const run = (): Promise<boolean> => {
    const ecosystemPath = path.join(__dirname, 'ecosystem.config.js');
    const runconfigPath = path.join(rootPath, 'run.config.js');

    pm2('start', ecosystemPath);

    const runConfigWatcher = gulp.watch(runconfigPath, (done) => {
        pm2('restart', ecosystemPath, ' --update-env');

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
