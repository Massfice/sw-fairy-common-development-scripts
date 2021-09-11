// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SubProcess } from 'teen_process';
import path from 'path';

import { App } from '../../run.config';
import { projectConfig } from '../project.config';
import { loadResolver } from './resolver';

enum Event {
    exit = 'exit',
    stop = 'stop',
    end = 'end',
    die = 'die',
    output = 'output',
    'lines-stdout' = 'lines-stdout',
    'stream-line' = 'stream-line',
}

const rootPath = path.join(__dirname, '..', '..');

let appPort: number;

export const exec = async (app: App, config: projectConfig): Promise<SubProcess> => {
    if (!appPort) {
        appPort = config.port;
    }

    const resolverPath = path.relative(__dirname, path.join(rootPath, app.resolverPath));
    const resolver = await loadResolver(resolverPath);

    const { command, environment = {} } = resolver(app.name, appPort, app.environment);

    if (!command || command.length === 0) {
        throw new Error('Command not specified');
    }

    const subProcess = new SubProcess(command[0], command.slice(1), {
        shell: true,
        cwd: path.join(rootPath, app.dir),
        env: environment,
    });

    subProcess.on(Event['stream-line'], (line: string) => {
        console.log(line);
    });

    appPort++;

    await subProcess.start();

    return subProcess;
};
