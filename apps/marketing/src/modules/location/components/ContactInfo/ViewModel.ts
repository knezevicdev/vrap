import getConfig from 'next/config';

import { LocationInfo } from 'src/modules/locations/getLocations';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

class ContactInfoViewModel {
  readonly title = `Selling? We're buying!`;
  readonly buttonLabel = 'See what my car’s worth';
  readonly locationInfo: LocationInfo;

  constructor(locationInfo: LocationInfo) {
    this.locationInfo = locationInfo;
  }

  handleClick(): void {
    const vitParams = `?vit_source=texasdirectauto&vit_medium=wl&vit_dest=vroom&vit_brand=TDA`;
    const url = `${VROOM_URL}/sell${vitParams}`;
    window.location.href = url;
  }
}

export default ContactInfoViewModel;
