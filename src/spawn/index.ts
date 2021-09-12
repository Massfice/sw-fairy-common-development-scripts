import gulp from 'gulp';

import moveSrc from './moveSrc';
import executeScripts from './executeScripts';

const spawn = ({
    destinationDir,
    templateDir,
    moveGulpfile = true,
}: {
    destinationDir: string;
    templateDir: string;
    moveGulpfile?: boolean;
}): gulp.TaskFunction => {
    return gulp.series(
        () => moveSrc(templateDir, destinationDir, moveGulpfile),
        () => executeScripts(templateDir, destinationDir),
    );
};

export default spawn;
