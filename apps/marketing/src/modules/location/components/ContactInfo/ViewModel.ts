import { LocationInfo } from 'src/modules/locations/getLocations';

class ContactInfoViewModel {
  constructor(locationInfo: LocationInfo) {
    this.locationInfo = locationInfo;
  }
  readonly title = `Selling? We're buying!`;
  readonly suycLink = '/sell';
  readonly buttonLabel = 'See what my car’s worth';
  readonly locationInfo: LocationInfo;
}

export default ContactInfoViewModel;
