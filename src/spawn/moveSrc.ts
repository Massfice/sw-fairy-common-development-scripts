import gulp from 'gulp';
import chalk from 'chalk';

const moveSrc = (templateDir: string, destinationDir: string, moveGulpfile: boolean): NodeJS.ReadWriteStream => {
    console.log(chalk`{keyword('green') Moving source files...}`);

    const filePatters = [`${templateDir}/src/**`];

    if (!moveGulpfile) {
        filePatters.push(`!${templateDir}/src/gulpfile.ts`);
        filePatters.push(`!${templateDir}/src/gulpfile.js`);
        filePatters.push(`!${templateDir}/src/gulpfile.js.map`);
        filePatters.push(`!${templateDir}/src/gulpfile.d.ts`);
        filePatters.push(`!${templateDir}/src/gulpfile.dest.ts`);
        filePatters.push(`!${templateDir}/src/gulpfile.dest.js`);
        filePatters.push(`!${templateDir}/src/gulpfile.dest.js.map`);
        filePatters.push(`!${templateDir}/src/gulpfile.dest.d.ts`);
    }

    return gulp.src(filePatters).pipe(gulp.dest(destinationDir));
};

export default moveSrc;
