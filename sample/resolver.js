module.exports = (name, port, environment) => {
    return {
        command: ['npm', 'start'],
        environment: { APP_PORT: port, TEST: environment.TEST.toLowerCase() },
    };
};
