import gulp from 'gulp';

import moveSrc from './moveSrc';
import executeScripts from './executeScripts';
import npmInstall from './npmInstall';

const spawn = ({
    destinationDir,
    templateDir,
    moveGulpfile = true,
    onlyProduction = false,
}: {
    destinationDir: string;
    templateDir: string;
    moveGulpfile?: boolean;
    onlyProduction?: boolean;
}): gulp.TaskFunction => {
    return gulp.series(
        () => moveSrc(templateDir, destinationDir, moveGulpfile),
        () => executeScripts(templateDir, destinationDir),
        () => npmInstall(destinationDir, onlyProduction),
    );
};

export default spawn;
