import globalEnv from 'src/globalEnv';

interface Link {
  label: string;
  href: string;
}

class SearchViewModel {
  readonly mobileButtonLabel: string = 'Browse All Vehicles';
  readonly link: Link = {
    href: '/catalog',
    label: 'Browse all low-mileage cars\xa0and\xa0trucks',
  };
  readonly car: { src: string; alt: string } = {
    src: `${globalEnv.CDN_URL}/modules/home/images/prius.png`,
    alt: 'Prius',
  };

  handleMobileButtonClick(): void {
    window.location.href = '/catalog';
  }
}

export default SearchViewModel;
