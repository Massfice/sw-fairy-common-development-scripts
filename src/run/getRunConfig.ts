import fs from 'fs';
import path from 'path';

import runConfig from '../../run.config';

const getRunConfig = (): runConfig.App[] => {
    const config = fs.readFileSync(path.resolve(__dirname, '..', '..', 'run.config.json')).toString();

    const { apps }: { apps: runConfig.App[] } = JSON.parse(config);

    return apps;
};

export default getRunConfig;
