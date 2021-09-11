import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { projectConfig } from '../../project.config';
import { runConfig } from '../../run.config';

export interface Config {
    project?: projectConfig;
    run?: runConfig;
}

export class ConfigLoader {
    static init(): Promise<Config> {
        return Promise.all([
            ConfigLoader.load<projectConfig>('../../project.config.json'),
            ConfigLoader.load<runConfig>('../../run.config.json'),
        ]).then(([projectConfig, runConfig]) => {
            return {
                project: projectConfig,
                run: runConfig,
            };
        });
    }

    static async load<T>(dest: string): Promise<T> {
        const readFile = promisify(fs.readFile);

        const filePath = path.join(__dirname, dest);

        const content = await readFile(filePath);

        return JSON.parse(content.toString());
    }
}
