import { MutableRefObject } from 'react';

import { Address } from './index';

const useHandlePlaceChanged = (
  autocomplete: MutableRefObject<google.maps.places.Autocomplete | undefined>,
  onAddressChange: (address: Address) => void
) => {
  return (): void => {
    const place = autocomplete.current?.getPlace();

    if (!place || (place.types && place.types[0] === 'route')) return;

    const address = {
      streetNumber: '',
      street: '',
      city: '',
      state: '',
      stateLongName: '',
      country: '',
      addressLine: '',
      zip: '',
    };

    place.address_components?.forEach(
      ({ short_name: shortName, long_name: longName, types }) => {
        if (types.includes('locality')) {
          address.city = longName;
        } else if (types.includes('sublocality')) {
          address.city = longName;
        } else if (types.includes('street_number')) {
          address.streetNumber = longName;
        } else if (types.includes('route')) {
          address.street = longName;
        } else if (types.includes('administrative_area_level_1')) {
          address.state = shortName;
          address.stateLongName = longName;
        } else if (types.includes('postal_code')) {
          address.zip = shortName;
        } else if (types.includes('administrative_area_level_2')) {
          address.country = longName;
        }
      }
    );
    address.addressLine = `${address.streetNumber} ${address.street}`.trim();

    if (
      address.addressLine.includes('undefined') ||
      ['AK', 'HI'].includes(address.state)
    ) {
      onAddressChange({
        streetNumber: '',
        street: '',
        city: '',
        state: '',
        stateLongName: '',
        country: '',
        addressLine: '',
        zip: '',
      });
      return;
    }

    if (address.country) {
      if (address.country.includes('Country')) {
        address.country = address.country.replace('Country', '');
      }
      if (address.country.includes('St.')) {
        address.country = address.country.replace('St.', 'Saint');
      }
    }

    if (address.city && address.city.includes('St.')) {
      address.city = address.city.replace('St.', 'Saint');
    }

    onAddressChange(address);
  };
};

export default useHandlePlaceChanged;
