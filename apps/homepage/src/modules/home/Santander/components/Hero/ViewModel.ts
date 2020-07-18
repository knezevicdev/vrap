interface Link {
  label: string;
  href: string;
}

class ViewModel {
  readonly title: string = 'Great cars.\nDelivered to you.';
  readonly browseLink: Link = {
    label: 'Browse all low-mileage cars and trucks',
    href: '/cars',
  }
}

export default ViewModel;
