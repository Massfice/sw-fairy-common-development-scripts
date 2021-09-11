// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SubProcess } from 'teen_process';
import deepEqual from 'deep-equal';
import gulp from 'gulp';
import path from 'path';
import kill from 'tree-kill';

import { ConfigLoader } from '../config/config';
import { ProjectConfig } from '../../project.config';
import { exec } from './process';
import { App, RunConfig, Style } from '../../run.config';
import styler from '../styler/styler';

type Difference = {
    added: App[];
    modified: App[];
    removed: string[];
};

const calculateDifference = (prevRunConfig: RunConfig, runConfig: RunConfig): Difference => {
    const prevRunConfigNames = prevRunConfig.apps.map((app) => app.name);
    const runConfigNames = runConfig.apps.map((app) => app.name);

    const added = runConfig.apps.filter((app) => !prevRunConfigNames.includes(app.name));
    const removed = prevRunConfig.apps.filter((app) => !runConfigNames.includes(app.name)).map((app) => app.name);

    const addedNames = added.map((app) => app.name);

    const modified = runConfig.apps
        .filter((app) => !removed.includes(app.name) && !addedNames.includes(app.name))
        .filter((app) => {
            const prevApp = prevRunConfig.apps.find((prevApp) => app.name === prevApp.name);

            if (!prevApp) {
                return false;
            }

            return !deepEqual(app, prevApp, { strict: true });
        });

    return {
        added,
        modified,
        removed,
    };
};

const stopApp = (name: string, style: Style, subProcess: SubProcess): Promise<void> => {
    console.log(styler('Stopping', name, style));

    return new Promise<void>((resolve) => {
        kill(subProcess.proc.pid, () => {
            resolve();
        });
    });
};

const runConfigPath = path.join(__dirname, '..', '..', 'run.config.json');

const start = async (): Promise<void> => {
    let prevRunConfig: RunConfig = { apps: [] };
    let subProcesses: { name: string; process: SubProcess }[] = [];

    const start = async () => {
        const config = await ConfigLoader.init();

        if (!config.project || !config.run) {
            throw new Error('Something went wrong');
        }

        const difference = calculateDifference(prevRunConfig, config.run as RunConfig);

        for (const subProcess of subProcesses) {
            if (
                difference.modified
                    .map((app) => app.name)
                    .concat(difference.removed)
                    .includes(subProcess.name)
            ) {
                const app = config.run.apps.find((app) => app.name === subProcess.name);

                const style = app && app.style ? app.style : {};

                await stopApp(subProcess.name, style, subProcess.process);
            }
        }

        subProcesses = await Promise.all(
            difference.added.concat(difference.modified).map((app) => {
                return exec(app, config.project as ProjectConfig);
            }),
        );

        prevRunConfig = config.run;
    };

    start();

    const runConfigWatcher = gulp.watch(runConfigPath, async (done) => {
        await start();
        done();
    });

    return new Promise<void>((resolve) => {
        process.on('SIGINT', async () => {
            for (const subProcess of subProcesses) {
                const app = prevRunConfig.apps.find((app) => app.name === subProcess.name);

                const style = app && app.style ? app.style : {};

                await stopApp(subProcess.name, style, subProcess.process);
            }

            runConfigWatcher.close();

            resolve();
        });
    }).then(() => {
        setTimeout(() => {
            process.exit(0);
        }, 250);
    });
};

export default start;
