import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';

class ViewModel {
  readonly questions: string = 'Questions?';
  readonly helpCenter: string = 'VISIT OUR HELP CENTER';
  readonly sendMessage: string = 'SEND A MESSAGE';
  readonly phoneNumber: string = '(855) 524-1300';

  readonly faqLink: string = '/contact';
  readonly emailLink: string = '/contact';
  readonly phoneLink: string = `tel:1-${this.phoneNumber.split(' ').join('-')}`;

  constructor(private absmartly: ABSmartlyContextValue) {}

  isFaceliftExp = (): boolean => {
    return this.absmartly.isInExperiment('ac-appraisal-offer-facelift');
  };
}

export default ViewModel;
