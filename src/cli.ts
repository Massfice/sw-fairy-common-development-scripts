import path from 'path';
import gulp from 'gulp';

const cli = () => {
    const callerDir = process.cwd();
    const cliDir = __dirname;
    const callerRelativeDir = path.relative(cliDir, callerDir);

    const dist = process.argv[2];

    if (!dist) {
        throw new Error('Dist not specified');
    }

    const distDir = path.join(callerRelativeDir, dist);

    gulp.series(async (): Promise<void> => {
        console.log({ callerDir, cliDir, callerRelativeDir, distDir });
    })(() => {
        console.log('Done');
    });
};

cli();

export {};
