import gulp from 'gulp';

import _start from './src/start';
import yargsMaker from './src/start/yargs';

const start = gulp.series(async () => {
    const { mode } = await yargsMaker();

    return _start(mode);
});

start.flags = {
    '--mode': 'mode allows to switch environment variables and project config',
};

export { start };
