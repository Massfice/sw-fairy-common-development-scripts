/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const rootPath = path.join(__dirname, '..', '..');
const currentPath = path.relative(rootPath, __dirname);

const runConfig = require(path.join(rootPath, 'run.config.json'));
const projectConfig = require('../project.config.json');

let portNumber = projectConfig.port;

const createApp = ({ name, environment, dir, command }) => {
    const app = {
        name: `${projectConfig.prefix}-${name}`,
        script: path.join(currentPath, 'exec.js'),
        args: `${dir} ${name} ${portNumber} 0 ${command}`,
        env: {
            ...environment,
            APP_PORT: portNumber,
        },
    };

    portNumber++;

    return app;
};

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
