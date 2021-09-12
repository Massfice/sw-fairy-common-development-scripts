import { deployPackage, configs } from '@massfice/sw-fairy-common-deploy-scripts';

const config = configs.package(__dirname);
const deploy = deployPackage(config);

export { deploy };
