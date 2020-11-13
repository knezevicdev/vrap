import { getLocations } from '../../getLocations';

class LocationsViewModel {
  readonly title = 'Houston Sell Us Your Car Centers';
  readonly subTitle =
    'Visit any of our 10 conveniently located Sell Us Your Car Centers listed here. Once you accept the offer at our store, you can leave with payment in hand.';
  readonly mapText = 'Map This Location';
  locations = getLocations();
}

export default LocationsViewModel;
