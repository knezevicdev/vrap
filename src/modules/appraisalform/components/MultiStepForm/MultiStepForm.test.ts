import MultiStepForm from './MultiStepForm';
import { FirstInfoForm, SecondInfoForm, ThirdInfoForm } from './example';

describe('<MultiStepForm />', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    const formExample = {
      fields: {
        first: {
          value: '',
          error: false,
          autofocus: true
        },
        last: {
          value: '',
          error: false,
          autofocus: false
        },
        email: {
          value: '',
          error: false,
          autofocus: false
        }
      },
      isFormValid: jest.fn()
    };

    const sections = [
      {
        component: FirstInfoForm,
        form: formExample,
        subTitle: 'Form 1',
        title: 'Section 1'
      },
      {
        component: SecondInfoForm,
        form: formExample,
        subTitle: 'Form 2',
        title: 'Section 2'
      },
      {
        component: ThirdInfoForm,
        form: formExample,
        subTitle: 'Form 3',
        title: 'Section 3'
      }
    ];

    props = {
      formTitle: 'Multi-step form example',
      sections: sections,
      onDone: jest.fn(),
      active: 0
    };
  });

  describe('rendering', () => {
    it('should match the snapshot', () => {
      wrapper = shallow(<MultiStepForm {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  // Ideally we'd have some tests around handleOnNext
  // however since enzyme doesn't yet support lifecycle hooks
  // this'll have to wait until a later date

  afterEach(() => {
    jest.clearAllMocks();
  });
});
