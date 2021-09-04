import gulp from 'gulp';

import _run from './run';

const run = gulp.series(() => {
    return _run({ dirname: __dirname });
});

export { run };
