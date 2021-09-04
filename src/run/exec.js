// eslint-disable-next-line @typescript-eslint/no-var-requires
const spawn = require('cross-spawn');

const [dir, appId, appPort, daprPort, command] = process.argv.slice(2);

const commands = ['run', '--app-id', appId];

if (parseInt(appPort) !== 0) {
    commands.push('--app-port', appPort);
}

if (parseInt(daprPort) !== 0) {
    commands.push('--dapr-http-port', daprPort);
}

if (command !== '') {
    commands.push('npm');
    commands.push('run');
    commands.push(command);
}

spawn('dapr', commands, {
    cwd: dir,
    stdio: 'inherit',
});
