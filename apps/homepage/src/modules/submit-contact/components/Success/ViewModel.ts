interface Link {
  label: string;
  href: string;
}

class SuccessViewModel {
  readonly title: string = 'Great news!';
  readonly description: string =
    'Your inquiry was received by our exclusive partner, Vroom. A Vroom representative will be in touch shortly.';
  readonly explaination: string =
    'Vroom is a smarter way to buy your next car - all without a trip to a dealership. Vroom brings the entire car buying process online offering an extensive selection of vehicles, transparent pricing, competitive trade-in offers and financing.  All you have to do is sit back, relax and Vroom will deliver your car right to you. No test drive? No problem. Keep the car for 7 days or 250 miles and see if it works for you. If not, return it and Vroom will refund the full purchase price. From deposit to delivery, Vroom has you covered. Get In.';
  readonly link: Link = {
    label: 'Back to home',
    href: '/',
  };
}

export default SuccessViewModel;
