import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from 'src/modules/inventory/store';

interface Repair {
  title: string;
  repairs: string[];
}

interface SafetyAndQuality {
  title: string;
  description: string;
}

interface Recall {
  title: string;
  description1: string;
  description2: string;
  linkText: string;
  url1: string;
  url2: string;
}

class SafetyAndQualityModel {
  private car: Car;
  constructor(store: InventoryStore) {
    this.car = store.vehicle._source;
  }

  readonly title: string = 'Safety & Quality';

  readonly repair: Repair = {
    title: 'Here’s what to expect from a Vroom vehicle:',
    repairs: [
      'All tires have at least <bold>4/32” tread in the middle.</bold>',
      'All brake pads are <bold>at least 4mm thick.</bold>',
      'Any scratches <bold>longer than 6 inches are fixed.</bold>',
      'Any paint chips <bold>are touched up.</bold>',
      'Any dents <bold>larger than a dime are fixed.</bold>',
      'Any <bold>windshield chips are repaired.</bold> If there are more than 3 chips, we replace the windshield.',
    ],
  };

  readonly safety: SafetyAndQuality = {
    title: 'We are committed to safety.',
    description:
      'Every vehicle undergoes thorough safety and mechanical inspections, ensuring everything from the suspension to the brake system is at, or above, state requirements. We only sell vehicles that have an accident-free CARFAX vehicle history report at the time of sale.',
  };

  readonly quality: SafetyAndQuality = {
    title: 'We are committed to quality.',
    description:
      'We want your new ride to look great. Our vehicles are used, so they aren’t perfect, but we make our best effort to fix anything outside of normal wear and tear and follow specific standards to ensure consistent quality every time.',
  };

  getRecall = (): Recall => {
    return {
      title: 'Recall Notice',
      description1:
        'Some of our vehicles may have unrepaired manufacturer safety recalls. Visit ',
      linkText:
        'https://www.nhtsa.gov/recalls to search for open safety recalls by VIN.',
      description2:
        'To learn more about safety recalls, visit our <boldlink>FAQ: What is a Safety Recall?</boldlink>',
      url1: `https://www.nhtsa.gov/recalls?vin=${this.car.vin}`,
      url2:
        'https://vroom.zendesk.com/hc/en-us/articles/115005333003-What-is-a-safety-recall',
    };
  };
}

export default SafetyAndQualityModel;
