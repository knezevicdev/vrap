import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';

import appConfig from './config';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: { ...appConfig.dev, ...process.env },
}));
