import Router from 'next/router';

class HeroViewModel {
  readonly title: string = `Great cars.\nDelivered to\xa0you.`;
  readonly mobileButtonLabel: string = 'Browse All Vehicles';

  handleMobileButtonClick(): void {
    Router.push('/cars');
  }
}

export default HeroViewModel;
