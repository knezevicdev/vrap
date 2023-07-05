import { generateFontsRequestHandler } from '@vroom-web/ui-lib';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default generateFontsRequestHandler(publicRuntimeConfig.BASE_PATH);
