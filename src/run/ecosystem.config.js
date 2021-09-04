// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const rootPath = path.join(__dirname, '..', '..');
const currentPath = path.relative(rootPath, __dirname);

module.exports = {
    apps: [
        {
            name: 'dapr',
            script: path.join(currentPath, 'exec.js'),
            args: `${rootPath} dapr 0 3500 keepDapr`,
        },
        {
            name: 'sampleApp',
            script: path.join(currentPath, 'exec.js'),
            args: `${path.join(__dirname, '..', '..', 'sample')} sampleApp 3000 0 start`,
            env: {
                APP_PORT: 3000,
                TEST: 'TEST_APP',
            },
        },
        {
            name: 'sampl2App',
            script: path.join(currentPath, 'exec.js'),
            args: `${path.join(__dirname, '..', '..', 'sample')} sampl2App 3001 0 start`,
            env: {
                APP_PORT: 3001,
                TEST: 'TEST_APP_2_UPDATED',
            },
        },
        {
            name: 'sampl3App',
            script: path.join(currentPath, 'exec.js'),
            args: `${path.join(__dirname, '..', '..', 'sample')} sampl3App 3002 0 start`,
            env: {
                APP_PORT: 3002,
                TEST: 'TEST_APP_3_UPDATED_UPDATED',
            },
        },
    ],
};
