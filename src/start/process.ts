// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SubProcess } from 'teen_process';
import path from 'path';

import { App } from '../../run.config';
import { ProjectConfig } from '../../project.config';
import { loadResolver } from './resolver';
import styler from '../styler/styler';

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

export const exec = async (
    app: App,
    config: ProjectConfig,
    mode: string,
    apps: App[],
): Promise<{ name: string; process: SubProcess }> => {
    const resolverPath = path.relative(__dirname, path.join(rootPath, app.resolverPath));
    const resolver = await loadResolver(resolverPath);

    if (!app.port) {
        throw new Error('Something went wrong');
    }

    const { command, environment = {} } = resolver(app.name, app.port, app.environment[mode], mode, apps);

    if (!command || command.length === 0) {
        throw new Error('Command not specified');
    }

    const subProcess = new SubProcess(command[0], command.slice(1), {
        shell: true,
        cwd: path.join(rootPath, app.dir),
        env: environment,
    });

    subProcess.on(Event['stream-line'], (line: string) => {
        console.log(`${styler('[', app.name, app.style ? app.style : {}, ']')} ${line}`);
    });

    console.log(styler('Starting', app.name, app.style ? app.style : {}));
    await subProcess.start();

    return { name: app.name, process: subProcess };
};
