import axios from 'axios';
import getConfig from 'next/config';

import logger from '../../utils/logger';
import requestHandler from '../../utils/requestHandler';

const { serverRuntimeConfig } = getConfig();

interface Location {
  lat: number;
  lng: number;
}

const vroomLocations = [
  {
    name: 'Stafford 12053 Southwest Freeway, Stafford, TX 77477',
    maps: 'https://goo.gl/maps/a7XPimfh95rLjARe6',
    hours: '9 AM - 6 PM, Monday - Saturday',
    number: '(281) 499-8200',
    lat: 29.645622,
    lng: -95.5719836,
  },
  {
    name: '1551 E Silver Star Rd, Ocoee, FL 34761',
    maps: 'https://goo.gl/maps/YqwGVkVFmdUNBp4V7',
    hours: '10 AM - 7 PM, Monday - Saturday',
    number: '(407) 955-4714',
    lat: 28.5735156,
    lng: -81.52028899999999,
  },
  {
    name: 'Scottsdale 15227 N 87th Suite 105, Scottsdale, AZ 85260',
    maps: 'https://goo.gl/maps/2LqZULDR7GDMGqdM6',
    hours: '9 AM - 6 PM, Monday - Saturday',
    number: '(480) 712-4770',
    lat: 33.6234227,
    lng: -111.8917919,
  },
];

const getAddressLatLng = async (address: string): Promise<Location> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${serverRuntimeConfig.GOOGLE_MAPS_GEOCODING_API_KEY}`;

  const { data } = await axios.get(url);

  const lat = data.results[0].geometry.location.lat;
  const lng = data.results[0].geometry.location.lng;

  return {
    lat,
    lng,
  };
};

const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

const calculateDistanceInMiles = (
  location1: Location,
  location2: Location
): number => {
  const R = 3958.8; // Earth's radius in miles

  const dLat = toRadians(location2.lat - location1.lat);
  const dLon = toRadians(location2.lng - location2.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(location1.lat)) *
      Math.cos(toRadians(location2.lat)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in miles
  return R * c;
};

export default requestHandler(
  async (req, res) => {
    const address = req.body.address;

    if (!address) {
      res.status(422).end();
      return;
    }

    let addressLatLng: Location;
    try {
      addressLatLng = await getAddressLatLng(address);
    } catch (e) {
      logger.warn('Failed to fetch address latitude and longitude', e);
      res.json({
        found: false,
      });
      return;
    }

    let locationWithMinimalDistance:
      | (Location & {
          name: string;
          distance: number;
          maps: string;
          hours: string;
          number: string;
        })
      | undefined;

    for (const vroomLocation of vroomLocations) {
      const distanceFromLocation = calculateDistanceInMiles(
        vroomLocation,
        addressLatLng
      );

      if (
        !locationWithMinimalDistance ||
        locationWithMinimalDistance.distance > distanceFromLocation
      ) {
        locationWithMinimalDistance = {
          ...vroomLocation,
          distance: distanceFromLocation,
        };
      }
    }

    if (
      !locationWithMinimalDistance ||
      locationWithMinimalDistance.distance > 150
    ) {
      res.json({
        found: false,
      });
      return;
    }

    res.json({
      found: true,
      address: locationWithMinimalDistance.name,
      maps: locationWithMinimalDistance.maps,
      hours: locationWithMinimalDistance.hours,
      number: locationWithMinimalDistance.number,
    });
  },
  {
    method: 'POST',
  }
);
