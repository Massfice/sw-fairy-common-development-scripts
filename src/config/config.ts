import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { ProjectConfig } from '../../project.config';
import { RunConfig } from '../../run.config';

export interface Config {
    project?: ProjectConfig;
    run?: RunConfig;
}

export class ConfigLoader {
    static init(): Promise<Config> {
        return Promise.all([
            ConfigLoader.load<ProjectConfig>('../../project.config.json'),
            ConfigLoader.load<RunConfig>('../../run.config.json'),
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
