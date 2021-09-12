import gulp from 'gulp';
import chalk from 'chalk';

const moveSrc = (templateDir: string, destinationDir: string): NodeJS.ReadWriteStream => {
    console.log(chalk`{keyword('green') Moving source files...}`);

    return gulp.src(`${templateDir}/src/**`).pipe(gulp.dest(destinationDir));
};

export default moveSrc;
