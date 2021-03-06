#!/usr/bin/env node

import path from 'path';

import spawn from './spawn';

const cli = () => {
    const callerDir = process.cwd();

    const destination = process.argv[2];

    if (!destination) {
        throw new Error('Dist not specified');
    }

    const destinationDir = path.join(callerDir, destination);
    const templateDir = path.join(__dirname, '..', '..');

    const done = () => console.log('Done');

    spawn({ destinationDir, templateDir, moveGulpfile: false, onlyProduction: true })(done);
};

cli();

export {};
