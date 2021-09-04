import RunOptions from '../types/runOptions';
import gulp from 'gulp';
import path from 'path';

const run = (options: RunOptions) => {
    const ecosystemPath = path.join(options.dirname, 'ecosystem.config.js');

    return gulp.watch(ecosystemPath, (done) => {
        console.log('Ecosystem changed');

        done();
    });
};

export default run;
