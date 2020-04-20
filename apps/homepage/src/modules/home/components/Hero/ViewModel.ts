interface Link {
  label: string;
  href: string;
}

class HeroViewModel {
  readonly title: string = `Great cars.\nDelivered to\xa0you.`;
  readonly mobileButtonLabel: string = 'Browse All Vehicles';
  readonly link: Link = {
    // TODO: update link to appropriate page.
    href: '/',
    label: 'Browse all low-mileage cars\xa0and\xa0trucks',
  };

  handleMobileButtonClick(): void {
    // TODO navigate to the appropriate page.
  }
}

export default HeroViewModel;
