import gulp from 'gulp';

import _start from './src/start';

const start = gulp.series(() => {
    return _start();
});

export { start };
