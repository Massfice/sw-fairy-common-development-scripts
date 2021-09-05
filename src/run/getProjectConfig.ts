import fs from 'fs';
import path from 'path';

import { projectConfig } from '../project.config';

const getProjectConfig = (): projectConfig => {
    const config = fs.readFileSync(path.resolve(__dirname, '..', 'project.config.json')).toString();

    return JSON.parse(config);
};

export default getProjectConfig;
