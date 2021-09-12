const Vinyl = require('vinyl');
const gulp = require('gulp');
const rename = require('gulp-rename');
const chalk = require('chalk');
const fs = require('fs');

const createJSONFile = (filename, destinationDir, obj) => {
    console.log(chalk`{keyword('green') Creating} {bold.keyword('green') ${filename}} {keyword('green') file...}`);

    const stream = require('stream').Readable({ objectMode: true });

    stream._read = function () {
        this.push(
            new Vinyl({
                path: filename,
                contents: Buffer.from(JSON.stringify(obj, null, 4), 'utf-8'),
            }),
        );

        this.push(null);
    };

    return stream.pipe(gulp.dest(destinationDir));
};

const createRunConfig = (templateDir, destinationDir) => {
    return createJSONFile('run.config.json', destinationDir, {
        environment: { default: {} },
        apps: [
            {
                name: 'name',
                environment: { default: {} },
                dir: 'dir',
                resolverPath: 'resolverPath',
                style: {
                    bold: true,
                    italic: true,
                    underline: true,
                    strikethrough: true,
                    color: 'red',
                    bg: 'gray',
                },
            },
        ],
    });
};

const createProjectConfig = (templateDir, destinationDir) => {
    return createJSONFile('project.config.json', destinationDir, {
        default: {
            port: 1000,
        },
    });
};

const createTemplateDir = (templateDir, destinationDir) => {
    console.log(chalk`{keyword('green') Creating} {bold.keyword('green') template} {keyword('green') directory...}`);

    return new Promise((resolve) => {
        fs.mkdir(`${destinationDir}/templates`, () => {
            resolve();
        });
    });
};

const copyFile = (srcFile, destFile) => (templateDir, destinationDir) => {
    console.log(
        chalk`{keyword('green') Copying} {bold.keyword('green') ${srcFile}} {keyword('green') to} {bold.keyword('green') ${destFile}} {keyword('green') ...}`,
    );

    return gulp
        .src(`${templateDir}/src/${srcFile}`)
        .pipe(rename(destFile))
        .pipe(gulp.dest(`${destinationDir}`));
};

module.exports = [
    createRunConfig,
    createProjectConfig,
    createTemplateDir,
    copyFile('gulpfile.dest.d.ts', 'gulpfile.d.ts'),
    copyFile('gulpfile.dest.js', 'gulpfile.js'),
    copyFile('gulpfile.dest.js.map', 'gulpfile.js.map'),
    copyFile('package.dest.json', 'package.json'),
];
