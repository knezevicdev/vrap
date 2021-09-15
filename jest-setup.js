import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: { ...process.env },
}));
