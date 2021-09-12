module.exports = ({ name, port, environment, globalEnvironment, mode, apps, projectConfig }) => {
    const nextAppFor = {
        App1: 'App2',
        App2: 'App3',
        App3: 'App4',
        App4: 'App5',
        App5: 'App6',
        App6: 'App1',
    };

    const nextApp = apps.find((app) => {
        return app.name === nextAppFor[name];
    });

    const nextAppEnv = nextApp ? `[ ${nextApp.name} ] http://localhost:${nextApp.port}` : 'Undefined';

    return {
        command: ['npm', 'start'],
        environment: {
            APP_PORT: port,
            TEST: environment.TEST.toLowerCase(),
            NEXT_APP: nextAppEnv,
            EXTRA: JSON.stringify({ mode, projectConfig }),
            GLOBAL: globalEnvironment.GLOBAL,
        },
    };
};
