import gulp from 'gulp';

import _run from './src/run';
import _start from './src/start';

const run = gulp.series(() => {
    return _run();
});

const start = gulp.series(() => {
    return _start();
});

export { run, start };
