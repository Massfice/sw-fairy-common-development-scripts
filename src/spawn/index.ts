import gulp from 'gulp';

import moveSrc from './moveSrc';
import executeScripts from './executeScripts';

const spawn = ({ destinationDir, templateDir }: { destinationDir: string; templateDir: string }): gulp.TaskFunction => {
    return gulp.series(
        () => moveSrc(templateDir, destinationDir),
        () => executeScripts(templateDir, destinationDir),
    );
};

export default spawn;
