import gulp from 'gulp';

import _run from './src/run';

const run = gulp.series(() => {
    return _run();
});

export { run };
