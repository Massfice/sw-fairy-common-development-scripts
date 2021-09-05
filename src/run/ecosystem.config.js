/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const rootPath = path.join(__dirname, '..', '..');
const currentPath = path.relative(rootPath, __dirname);

const runConfig = require(path.join(rootPath, 'run.config.json'));
const projectConfig = require('../project.config.json');

let portNumber = projectConfig.port;

const createApp = ({ name, environment, dir, command }) => {
    const run = !projectConfig.daprEnabled
        ? `npm run ${command}`
        : `dapr run --app-id ${name} --app-port ${portNumber} npm run ${command}`;

    const app = {
        name: `${projectConfig.prefix}-${name}`,
        script: path.join(currentPath, 'exec.js'),
        args: `${dir} "${run}"`,
        env: {
            ...environment,
            APP_PORT: portNumber,
        },
    };

    portNumber++;

    return app;
};

const apps = runConfig.apps.map((entry) => createApp(entry));

if (projectConfig.daprEnabled) {
    apps.unshift({
        name: 'dapr',
        script: path.join(currentPath, 'exec.js'),
        args: `${currentPath} "dapr run --app-id dapr --dapr-http-port 3500"`,
    });
}

module.exports = {
    apps,
};
