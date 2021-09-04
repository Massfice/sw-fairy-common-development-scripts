module.exports = [
    { name: 'sampleApp', port: 3000, environment: { TEST: 'TEST_APP' }, dir: './sample', command: 'start' },
    { name: 'sampl2App', port: 3001, environment: { TEST: 'TEST_APP_2_UPDATED' }, dir: './sample', command: 'start' },
    {
        name: 'sampl3App',
        port: 3002,
        environment: { TEST: 'TEST_APP_3_UPDATED_UPDATED' },
        dir: './sample',
        command: 'start',
    },
    {
        name: 'sampl4App',
        port: 3003,
        environment: { TEST: 'TEST_APP_3_UPDATED_UPDATED_UPDATED' },
        dir: './sample',
        command: 'start',
    },
    {
        name: 'sampl5App',
        port: 3004,
        environment: { TEST: 'TEST_APP_3_UPDATED_UPDATED_UPDATED_UPDATED' },
        dir: './sample',
        command: 'start',
    },
];
