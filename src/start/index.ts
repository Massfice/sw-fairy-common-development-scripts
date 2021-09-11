import { ConfigLoader } from '../config/config';
import { projectConfig } from '../project.config';
import { exec } from './process';

const start = async (): Promise<void> => {
    const config = await ConfigLoader.init();

    if (!config.project || !config.run) {
        throw new Error('Something went wrong');
    }

    const processes = await Promise.all(
        config.run.apps.map((app) => {
            return exec(app, config.project as projectConfig);
        }),
    );

    return new Promise<void>((resolve) => {
        process.on('SIGINT', async () => {
            for (const subProcess of processes) {
                await subProcess.stop();
            }

            resolve();
        });
    }).then(() => {
        setTimeout(() => {
            process.exit(0);
        }, 250);
    });
};

export default start;
