// eslint-disable-next-line @typescript-eslint/no-var-requires
const spawn = require('cross-spawn');

const [dapr, dir, appId, appPort, daprPort, command] = process.argv.slice(2);

const strategies = {
    disabled: () => {
        const commands = ['run', command];

        spawn('npm', commands, {
            cwd: dir,
            stdio: 'inherit',
        });
    },
    enabled: () => {
        const commands = ['run', '--app-id', appId];

        if (parseInt(appPort) !== 0) {
            commands.push('--app-port', appPort);
        }

        if (parseInt(daprPort) !== 0) {
            commands.push('--dapr-http-port', daprPort);
        }

        commands.push('npm');
        commands.push('run');
        commands.push(command);

        spawn('dapr', commands, {
            cwd: dir,
            stdio: 'inherit',
        });
    },
};

strategies[dapr]();
