interface Link {
  label: string;
  href: string;
  target?: string;
}

class ViewModel {
  readonly header: string = 'Need assistance?\nWe’re here to help.';
  readonly vehicleTitle: string = 'For questions about a vehicle';
  readonly accountTitle: string =
    'For questions about your\nSantander Consumer USA account';

  readonly callVroom = 'Call our partner';
  readonly callSantander = 'Call us at ';
  readonly vroomNumber: Link = {
    label: 'at 1-855-659-0278',
    href: 'tel:+18556590278',
  };
  readonly santanderNumber: Link = {
    label: '1-888-222-4227',
    href: 'tel:+18882224227',
  };

  readonly afterSantanderNumber: string = ' or see our other\n';

  readonly supportOptions: Link = {
    label: 'support contact options.',
    href: 'https://santanderconsumerusa.com/support/contact',
    target: '_blank',
  };
}

export default ViewModel;
