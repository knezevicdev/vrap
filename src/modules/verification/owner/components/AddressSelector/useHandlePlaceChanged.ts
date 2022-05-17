import { MutableRefObject } from 'react';

import { Address } from './index';

const useHandlePlaceChanged = (
  autocomplete: MutableRefObject<google.maps.places.Autocomplete | undefined>,
  onAddressChange: (address: Address) => void
) => {
  return (): void => {
    const place = autocomplete.current?.getPlace();
    if (!place) return;

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

    const resetAddress = () => {
      address.streetNumber = '';
      address.street = '';
      address.city = '';
      address.state = '';
      address.stateLongName = '';
      address.country = '';
      address.addressLine = '';
      address.zip = '';
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
    address.addressLine = `${address.streetNumber} ${address.street}`;

    if (
      address.addressLine.includes('undefined') ||
      ['AK', 'HI'].includes(address.state)
    ) {
      resetAddress();
      onAddressChange(address);
      return;
    }

    if (address.country) {
      if (address.country.includes('Country')) {
        address.country = address.country.replace(' County', '');
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
