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
        },
        {
            name: 'sampl2App',
            script: 'exec.js',
            args: `${path.join(__dirname, '..', 'sampl2')} sampl2App 3001 0 start`,
        },
    ],
};
