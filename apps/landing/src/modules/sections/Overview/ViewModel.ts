import { Icons } from '../../../core/Icon';

class OverviewViewModel {
  readonly sectionTitle = 'overview';
  readonly content = `The 2019 Jeep Wrangler is a great vehicle for anyone who wants an
          iconic, dependable, and rugged ride. Mostly influenced by the military
          Jeep from World War II, it remains the epitome of Jeep's brand. The
          reason these vehicles are so popular is their versatility to be used
          as a daily commuter during the week and an off-roader on the weekends.
          Available with two or four doors (Wrangler Unlimited) and a 6-speed
          manual or 8-speed automatic transmission, the Wrangler has adapted
          over the years to accommodate all drivers.`;

  readonly details = [
    {
      icon: Icons.GAS,
      title: `20 MPG`,
      description: `Combined`,
    },
    {
      icon: Icons.ENGINE,
      title: `285 HP`,
      description: `@6,400 RPMs`,
    },
    {
      icon: Icons.SEAT,
      title: `Seats 5`,
      description: `Passengers`,
    },
  ];
}

export default OverviewViewModel;
