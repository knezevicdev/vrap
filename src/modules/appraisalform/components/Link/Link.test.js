import Link from './Link';
import { PATHS } from '@app/constants/routes';
import { NavLink } from 'react-router-dom';
import { track } from '@app/lib/analytics/AnalyticsLib';
import { trackSearch } from '@app/lib/analytics/analytics/search';

jest.mock('@app/lib/analytics/AnalyticsLib');
jest.mock('@app/lib/analytics/analytics/search');

describe('<Link />', () => {
  let wrapper;

  it('should render a NavLink when given an app route', () => {
    // Just sampling a few routes, add more if necessary.
    wrapper = shallow(<Link to={PATHS.home.prefix} />);
    expect(wrapper.exists(NavLink)).toEqual(true);
    wrapper = shallow(<Link to={PATHS.about.prefix} />);
    expect(wrapper.exists(NavLink)).toEqual(true);
    wrapper = shallow(
      <Link to={PATHS.inventory.withParams({ vehicle: 'JH4DB7640SS009074' })} />
    );
    expect(wrapper.exists(NavLink)).toEqual(true);
  });

  it('should render a NavLink when given an app route with a query string', () => {
    const pathname = PATHS.accountCreate.prefix;
    const redirectPath = PATHS.paymentOptions.withParams({
      vin: '1GT02ZCG6EF153641'
    });
    const to = {
      pathname,
      search: `?redirect=${redirectPath}`
    };
    wrapper = shallow(<Link to={to} />);
    expect(wrapper.exists(NavLink)).toEqual(true);
  });

  it('should render an anchor tag when given an external url', () => {
    const externalUrl = 'https://vroom.com';
    wrapper = shallow(<Link to={externalUrl} />);
    expect(wrapper.exists('a')).toEqual(true);
  });

  it('should render an anchor tag when given an id', () => {
    const id = '#element';
    wrapper = shallow(<Link to={id} />);
    expect(wrapper.exists('a')).toEqual(true);
  });

  describe('handleClick', () => {
    beforeEach(() => {
      global.document.getElementById = jest.fn(() => ({
        scrollTo: jest.fn()
      }));
    });

    it('should call trackSearch() with correct data for an "Autocomplete" action', () => {
      const linkAnalytics = {
        action: 'Autocomplete',
        data: 'some data'
      };
      const linkText = 'Home';
      wrapper = shallow(
        <Link to={PATHS.home.prefix} linkAnalytics={linkAnalytics}>
          {linkText}
        </Link>
      );
      trackSearch.mockReset();
      wrapper.props().onClick();
      expect(trackSearch).toHaveBeenCalledWith({
        label: linkText.toLowerCase(),
        eventName: 'interaction - Search',
        ...linkAnalytics
      });
    });

    it('should call trackSearch() with correct data for a "Free Form" action', () => {
      const linkAnalytics = {
        action: 'Free Form',
        data: 'some data'
      };
      const linkText = 'About';
      wrapper = shallow(
        <Link to={PATHS.about.prefix} linkAnalytics={linkAnalytics}>
          {linkText}
        </Link>
      );
      trackSearch.mockReset();
      wrapper.props().onClick();
      expect(trackSearch).toHaveBeenCalledWith({
        label: linkText.toLowerCase(),
        eventName: 'interaction - Search',
        ...linkAnalytics
      });
    });

    it('should call track() with correct data for other actions', () => {
      const linkAnalytics = {
        action: 'Other Action',
        data: 'some data'
      };
      const linkText = 'Catalog';
      wrapper = shallow(
        <Link to={PATHS.cars.prefix} linkAnalytics={linkAnalytics}>
          {linkText}
        </Link>
      );
      track.mockReset();
      wrapper.props().onClick();
      expect(track).toHaveBeenCalledWith({
        label: linkText.toLowerCase(),
        ...linkAnalytics
      });
    });
  });
});
