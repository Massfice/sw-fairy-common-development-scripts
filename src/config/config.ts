import fs from 'fs';
import path from 'path';
import EventEmiter from 'events';
import { promisify } from 'util';

import { projectConfig } from '../project.config';
import { runConfig } from '../../run.config';

export interface Config {
    project?: projectConfig;
    run?: runConfig;
}

export class ConfigLoader {
    static async init(): Promise<Config> {
        const EVENT_PROJECT_CONFIG = 'E_LOADED_PROJECT_CONFIG';
        const EVENT_RUN_CONFIG = 'E_LOADED_RUN_CONFIG';

        const event = new EventEmiter();
        const config: Config = {};

        const configPromise = new Promise<Config>((resolve) => {
            const resolveConfigs = () => {
                if (!config.project || !config.run) {
                    return;
                }

                resolve(config);
            };

            event.once(EVENT_PROJECT_CONFIG, resolveConfigs);
            event.once(EVENT_RUN_CONFIG, resolveConfigs);
        });

        const loadProjectConfig = async () => {
            config.project = await ConfigLoader.load<projectConfig>('../project.config.json');
            event.emit(EVENT_PROJECT_CONFIG);
        };

        const loadRunConfig = async () => {
            config.run = await ConfigLoader.load<runConfig>('../../run.config.json');
            event.emit(EVENT_RUN_CONFIG);
        };

        loadRunConfig();
        loadProjectConfig();

        return configPromise;
    }

    static async load<T>(dest: string): Promise<T> {
        const readFile = promisify(fs.readFile);

        const filePath = path.join(__dirname, dest);

        const content = await readFile(filePath);

        return JSON.parse(content.toString());
    }
}
