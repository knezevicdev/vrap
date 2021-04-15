import { PostInventoryRequestData } from '@vroom-web/inv-search-networking';

import { EmailCaptureStore } from './store';
import EmailCaptureCardViewModel from './ViewModel';

import { analyticsHandler } from 'src/integrations/AnalyticsHandler';
import { getPostInventoryRequestDataFromFilterData } from 'src/modules/cars/store';
import { Status } from 'src/networking/types';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

jest.mock('src/modules/cars/store', () => ({
  ...jest.requireActual('src/modules/cars/store'),
  getPostInventoryRequestDataFromFilterData: jest.fn(),
}));

const mockSearchParams = (getPostInventoryRequestDataFromFilterData as unknown) as jest.Mock<
  PostInventoryRequestData
>;

const oldWindow = window;

beforeEach(() => {
  global.window = oldWindow;
});

describe('EmailCaptureCard ViewModel Tests', () => {
  it('constructor sets the emailCaptureStore', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    expect(viewModel.emailCaptureStore).toEqual(store);
  });

  it('getInputValue returns the email in the store', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmail('test@vroom.com');
    expect(viewModel.getInputValue()).toBe('test@vroom.com');
  });

  it('getShowEmailCaptureForm returns true when the status is initial', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmailCaptureStatus(Status.INITIAL);
    expect(viewModel.getShowEmailCaptureForm()).toBe(true);
  });

  it('getShowEmailCaptureForm returns false when the status is anything but initial', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmailCaptureStatus(Status.FETCHING);
    expect(viewModel.getShowEmailCaptureForm()).toBe(false);
  });

  it('getIsSuccessful returns true when the status is success', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmailCaptureStatus(Status.SUCCESS);
    expect(viewModel.getIsSuccessful()).toBe(true);
  });

  it('getIsSuccessful returns false when the status is anything but success', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmailCaptureStatus(Status.FETCHING);
    expect(viewModel.getIsSuccessful()).toBe(false);
  });

  it('getIsError returns true when the status is error', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmailCaptureStatus(Status.ERROR);
    expect(viewModel.getIsError()).toBe(true);
  });

  it('getIsError returns false when the status is anything but error', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmailCaptureStatus(Status.FETCHING);
    expect(viewModel.getIsError()).toBe(false);
  });

  it('getIsLoading returns true when the status is fetching', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmailCaptureStatus(Status.FETCHING);
    expect(viewModel.getIsLoading()).toBe(true);
  });

  it('getIsLoading returns false when the status is anything but fetching', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmailCaptureStatus(Status.ERROR);
    expect(viewModel.getIsLoading()).toBe(false);
  });

  it('getIsValidationError returns true when the email in the store does not pass the regex and isValidationError is true', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmailValidationError(true);
    store.setEmail('te@st@vroom.com');
    expect(viewModel.getIsValidationError()).toBe(true);
  });

  it('getIsValidationError returns false when the email in the store passes the regex and isValidationError is true', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmailValidationError(true);
    store.setEmail('test@vroom.com');
    expect(viewModel.getIsValidationError()).toBe(false);
  });

  it('getIsValidationError returns false when isValidationError is false', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    store.setEmailValidationError(false);
    expect(viewModel.getIsValidationError()).toBe(false);
  });

  it('getSearchParams returns searchParams when the window exists', () => {
    const data = {
      makeSlug: ['dodge'],
      modelSlug: [],
      offset: 0,
      sortby: 'geo',
    };
    mockSearchParams.mockReturnValue(data);
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    expect(viewModel.getSearchParams()).toEqual(data);
  });

  it('getSearchParams returns empty object when the window does not exist', () => {
    delete (global as any).window;
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    expect(viewModel.getSearchParams()).toEqual({});
  });

  it('getSearchParams returns searchParams with isAvailableSoon as false when testdriveonly is true', () => {
    const data = {
      makeSlug: ['dodge'],
      modelSlug: [],
      offset: 0,
      sortby: 'geo',
      testdriveonly: true,
    };
    mockSearchParams.mockReturnValue(data);
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    expect(viewModel.getSearchParams()).toEqual({
      ...data,
      isAvailableSoon: false,
    });
  });

  it('getSearchParams returns searchParams with isAvailableSoon as undefined when testdriveonly is false', () => {
    const data = {
      makeSlug: ['dodge'],
      modelSlug: [],
      offset: 0,
      sortby: 'geo',
      testdriveonly: false,
    };
    mockSearchParams.mockReturnValue(data);
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    expect(viewModel.getSearchParams()).toEqual(data);
  });

  it('getSearchParams returns searchParams with isTitleQAPass when isTitleQAPass exists in urlParams', () => {
    const oldWindowLocation = window.location;
    delete (window as any).location;
    window.location = {
      ...oldWindowLocation,
      search:
        '?filters=eyJtYWtlc2FuZG1vZGVscyI6W3sibWFrZVNsdWciOiJkb2RnZSJ9XSwicGFnZSI6MX0=&isTitleQAPass=false',
    };
    const data = {
      makeSlug: ['dodge'],
      modelSlug: [],
      offset: 0,
      sortby: 'geo',
    };
    mockSearchParams.mockReturnValue(data);
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    expect(viewModel.getSearchParams()).toEqual({
      ...data,
      isTitleQAPass: false,
    });
  });

  it('getSearchParams returns searchParams with isTitleQAPass as undefined when isTitleQAPass does not exist in urlParams', () => {
    const oldWindowLocation = window.location;
    delete (window as any).location;
    window.location = {
      ...oldWindowLocation,
      search:
        '?filters=eyJtYWtlc2FuZG1vZGVscyI6W3sibWFrZVNsdWciOiJkb2RnZSJ9XSwicGFnZSI6MX0=',
    };
    const data = {
      makeSlug: ['dodge'],
      modelSlug: [],
      offset: 0,
      sortby: 'geo',
    };
    mockSearchParams.mockReturnValue(data);
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    expect(viewModel.getSearchParams()).toEqual(data);
  });

  it('onChange calls the setEmail store function', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    const spy = jest.spyOn(store, 'setEmail');
    viewModel.onChange({
      target: { value: 'test@vroom.com' },
    } as React.ChangeEvent<HTMLInputElement>);
    expect(spy).toHaveBeenCalledWith('test@vroom.com');
  });

  it('onClick calls the API async function, setEmailValidationError function with false, and analytics when the email passes the regex', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    const apiSpy = jest.spyOn(store, 'fetchEmailCapture');
    const validationSpy = jest.spyOn(store, 'setEmailValidationError');
    const analyticsSubmitSpy = jest.spyOn(
      analyticsHandler,
      'trackEmailCaptureSubmit'
    );
    store.setEmail('test@vroom.com');
    viewModel.onClick();
    expect(apiSpy).toHaveBeenCalledTimes(1);
    expect(validationSpy).toHaveBeenCalledWith(false);
    expect(analyticsSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('onClick calls the setEmailValidationError function with true and analytics when the email does not pass regex', () => {
    const store = new EmailCaptureStore();
    const viewModel = new EmailCaptureCardViewModel(store);
    const apiSpy = jest.spyOn(store, 'fetchEmailCapture');
    const validationSpy = jest.spyOn(store, 'setEmailValidationError');
    const analyticsSubmitSpy = jest.spyOn(
      analyticsHandler,
      'trackEmailCaptureSubmit'
    );
    store.setEmail('te@st@vroom.com');
    viewModel.onClick();
    expect(apiSpy).not.toHaveBeenCalled();
    expect(validationSpy).toHaveBeenCalledWith(true);
    expect(analyticsSubmitSpy).toHaveBeenCalledWith(true);
  });
});
