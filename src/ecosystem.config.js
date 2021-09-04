// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    apps: [
        {
            name: 'dapr',
            script: 'exec.js',
            args: `${__dirname} dapr 0 3500 start`,
        },
        {
            name: 'sampleApp',
            script: 'exec.js',
            args: `${path.join(__dirname, '..', 'sample')} sampleApp 3000 0 start`,
            env: {
                APP_PORT: 3000,
                TEST: 'TEST_APP',
            },
        },
        {
            name: 'sampl2App',
            script: 'exec.js',
            args: `${path.join(__dirname, '..', 'sample')} sampl2App 3001 0 start`,
            env: {
                APP_PORT: 3001,
                TEST: 'TEST_APP_2_UPDATED',
            },
        },
        {
            name: 'sampl3App',
            script: 'exec.js',
            args: `${path.join(__dirname, '..', 'sample')} sampl3App 3002 0 start`,
            env: {
                APP_PORT: 3002,
                TEST: 'TEST_APP_3_UPDATED_UPDATED',
            },
        },
    ],
};
