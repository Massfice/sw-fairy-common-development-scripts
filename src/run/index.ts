import gulp from 'gulp';
import path from 'path';
import { FSWatcher } from 'fs';
import { exec } from 'child_process';

import projectConfig from '../project.config';
import runConfig from '../../run.config';
import getRunConfig from './getRunConfig';

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

    let reloadWatchers: FSWatcher[] = [];

    const setReloads = () => {
        const config = getRunConfig();

        config.forEach((app: runConfig.App) => {
            if (!app.useReload) {
                return;
            }

            const applyReload = () => {
                const reloadWatcher = gulp.watch(path.join(rootPath, app.dir), (done) => {
                    pm2('reload', `${projectConfig.prefix}-${app.name}-app --force`);

                    done();
                });

                reloadWatchers.push(reloadWatcher);
            };

            applyReload();
        });
    };

    const runConfigWatcher = gulp.watch(runconfigPath, (done) => {
        reloadWatchers.forEach((reloadWatcher) => reloadWatcher.close());
        reloadWatchers = [];

        setReloads();

        pm2('delete', `/${projectConfig.prefix}-*/`, () => {
            pm2('start', ecosystemPath);
        });

        done();
    });

    setReloads();

    return new Promise<boolean>((resolve) => {
        process.on('SIGINT', () => {
            pm2('delete', ecosystemPath);

            runConfigWatcher.close();

            reloadWatchers.forEach((reloadWatcher) => reloadWatcher.close());

            resolve(true);
        });
    });
};

export default run;
