/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const rootPath = path.join(__dirname, '..', '..');
const currentPath = path.relative(rootPath, __dirname);

const runConfig = require(path.join(rootPath, 'run.config.js'));

const createApp = ({ name, port, environment, dir, command }) => ({
    name,
    script: path.join(currentPath, 'exec.js'),
    args: `${dir} ${name} ${port} 0 ${command}`,
    env: {
        ...environment,
        APP_PORT: port,
    },
});

const apps = runConfig.map((entry) => createApp(entry));

module.exports = {
    apps: [
        {
            name: 'dapr',
            script: path.join(currentPath, 'exec.js'),
            args: `${rootPath} dapr 0 3500 keepDapr`,
        },
        ...apps,
    ],
};
