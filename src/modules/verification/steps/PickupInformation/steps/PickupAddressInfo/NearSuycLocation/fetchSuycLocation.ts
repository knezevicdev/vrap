import axios from 'axios';

type SuycLocationResponse =
  | {
      found: false;
    }
  | {
      found: true;
      address: string;
      maps: string;
      hours: string;
      number: string;
    };

export interface SuycLocation {
  address: string;
  maps: string;
  hours: string;
  number: string;
}

const fetchSuycLocation = async (
  address: string
): Promise<SuycLocation | false> => {
  try {
    const { data } = await axios.post<SuycLocationResponse>(
      '/appraisal/api/suyc-location',
      {
        address,
      }
    );

    if (!data.found) return false;
    return {
      address: data.address,
      maps: data.maps,
      hours: data.hours,
      number: data.number,
    };
  } catch (e) {
    return false;
  }
};

export default fetchSuycLocation;
