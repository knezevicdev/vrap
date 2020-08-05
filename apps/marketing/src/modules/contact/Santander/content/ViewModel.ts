interface Link {
  label: string;
  href: string;
  target?: string;
}

class ViewModel {
  readonly headerTitle: string = 'Contact Us';
  readonly headerDescription: string =
    'Need assistance? Please choose from the following options';

  readonly vehicleTitle: string = 'For questions about a vehicle';
  readonly accountTitle: string =
    'For questions about your\nSantander Consumer USA account';

  readonly callVroom = 'Call our partners';
  readonly callSantander = 'Call us ';
  readonly vroomNumber: Link = {
    label: 'at 1-855-659-0278',
    href: 'tel:+18556590278',
  };
  readonly santanderNumber: Link = {
    label: 'at 1-888-222-4227',
    href: 'tel:+18882224227',
  };

  readonly afterSantanderNumber: string = ' or see our other\n';

  readonly supportOptions: Link = {
    label: 'support contact options.',
    href: 'https://santanderconsumerusa.com/support/contact',
    target: '_blank',
  };

  readonly callVroomButton: string = 'Call Vroom support';
  readonly callSantanderButton: string = 'Call Santander support';

  onClickCallVroom = (): void => {
    window.open('tel:18882224227');
  };

  onClickCallSantander = (): void => {
    window.open('tel:18882224227');
  };
}

export default ViewModel;
