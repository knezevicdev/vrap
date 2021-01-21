import PickupModel from './Model';
import { PickupViewProps } from './View';

const PickupViewModel = (model: PickupModel): PickupViewProps => ({
  handlePickup: (date: string): void => {
    model.submitPickup(date);
  },
});

export default PickupViewModel;
