import EmailCaptureNetworker, {
  EmailCaptureNetworking,
} from './EmailCaptureNetworker';
import { EmailCaptureStore } from './store';

import { Status } from 'src/networking/types';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

jest.mock('./EmailCaptureNetworker');
jest.mock('js-cookie');
jest.mock('jwt-decode');

const mockEmailCaptureNetworker = (EmailCaptureNetworker as unknown) as jest.Mock<
  EmailCaptureNetworking
>;

beforeEach(() => {
  localStorage.clear();
});

describe('EmailCaptureCard Store Tests', () => {
  it('should set the emailCaptureStatus in the constructor if one exists in localStorage', () => {
    localStorage.setItem('emailCaptureStatus', 'success');
    const store = new EmailCaptureStore();
    expect(store.emailCaptureStatus).toBe(Status.SUCCESS);
  });

  it('should not set the emailCaptureStatus in the constructor if one does not exists in localStorage', () => {
    const store = new EmailCaptureStore();
    expect(store.emailCaptureStatus).toBe(Status.INITIAL);
  });

  it('fetchEmailCapture should set emailCaptureStatus as success and set it in localStorage on API success', async () => {
    mockEmailCaptureNetworker.mockImplementation(() => {
      return {
        postEmailCapture: jest
          .fn()
          .mockResolvedValue({ data: { success: true } }),
      };
    });
    const store = new EmailCaptureStore();
    await store.fetchEmailCapture();
    expect(store.emailCaptureStatus).toBe(Status.SUCCESS);
    expect(window.localStorage.getItem('emailCaptureStatus')).toBe(
      Status.SUCCESS
    );
  });

  it('fetchEmailCapture should set emailCaptureStatus as error on API failure', async () => {
    mockEmailCaptureNetworker.mockImplementation(() => {
      return {
        postEmailCapture: jest.fn().mockRejectedValue(new Error('API error')),
      };
    });
    const store = new EmailCaptureStore();
    const analyticsErrorShownSpy = jest.spyOn(
      store.analyticsHandler,
      'trackEmailCaptureErrorShown'
    );
    await store.fetchEmailCapture();
    expect(store.emailCaptureStatus).toBe(Status.ERROR);
    expect(analyticsErrorShownSpy).toHaveBeenCalledTimes(1);
  });

  it('setEmail should set email as the passed in value', () => {
    const store = new EmailCaptureStore();
    expect(store.email).toBe('');
    store.setEmail('test@vroom.com');
    expect(store.email).toBe('test@vroom.com');
  });

  it('setEmailValidationError should set isValidationError as the passed in value', () => {
    const store = new EmailCaptureStore();
    expect(store.isValidationError).toBe(false);
    store.setEmailValidationError(true);
    expect(store.isValidationError).toBe(true);
  });

  it('setEmailCaptureStatus should set emailCaptureStatus as the passed in value', () => {
    const store = new EmailCaptureStore();
    expect(store.emailCaptureStatus).toBe(Status.INITIAL);
    store.setEmailCaptureStatus(Status.SUCCESS);
    expect(store.emailCaptureStatus).toBe(Status.SUCCESS);
  });
});
