import MultiTab from './';
import { FirstInfoTab, SecondInfoTab } from './example';

describe('<MultiTab />', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    const tabSections = [
      {
        component: FirstInfoTab,
        title: 'Section 1'
      },
      {
        component: SecondInfoTab,
        title: 'Section 2'
      }
    ];

    props = {
      tabSections: tabSections,
      active: 0
    };
  });

  describe('rendering', () => {
    it('should match the snapshot', () => {
      wrapper = shallow(<MultiTab {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
