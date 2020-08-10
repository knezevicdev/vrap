import { VinStore } from '../store';

import globalEnv from 'src/globalEnv';

class VinDialogViewModel {
  private readonly store: VinStore;
  readonly title: string = `What's a VIN, and where's mine?`;
  readonly description: string = `A Vehicle Identification Number (VIN) is like a thumbprint for your car.`;
  readonly descriptionTwo: string = `It's 17 characters long (digits and letters) and looks like this:`;

  readonly vin: string = '5N1AZ2MG9GN133457';
  readonly vinDiscovery: string =
    'You can find your VIN in several different places...';
  readonly carTitle: string = 'On Your Car';
  readonly carList: string[] = [
    `Driver's side interior dash`,
    `Under the hood (up front)`,
    `Between your front carb and windshield washer unit`,
    `Trunk, under the spare tire`,
    `Rear wheel wall`,
    `Driver door jam (open the door first)`,
  ];
  readonly image = {
    src: `${globalEnv.BASE_PATH}/modules/home/images/where-is-vin.png`,
    alt: 'Car with VIN hot spots.',
  };
  readonly documentationTitle: string = 'In Your Documentation';
  readonly documentationList: string[] = [
    `Vehicle title`,
    `Registration card`,
    `Insurance documents`,
    `Owner's manual`,
    `Body shop repair records`,
    `Police reports`,
    `Vehicle history report or VIN check`,
  ];

  constructor(store: VinStore) {
    this.store = store;
  }

  isOpen = (): boolean => {
    return this.store.isDialogOpen;
  };

  handleClose = (): void => {
    this.store.setIsDialogOpen();
  };
}

export default VinDialogViewModel;
