import axios, { AxiosInstance } from 'axios';

export type Vehicles = {
  vin: string;
  modelYear: string;
  make: string;
};
type LicensePlateToVinResponse = {
  data: {
    licensePlateToVin: {
      vehicles: Vehicles[];
    };
    status: string;
    step: string;
  };
};

interface LicensePlateToVinNetworking {
  getVin(
    licensePlate: string,
    state: string
  ): Promise<LicensePlateToVinResponse>;
}

export default class LicensePlateToVinNetworker
  implements LicensePlateToVinNetworking {
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = hostUrl;
  }

  async getVin(
    licensePlate: string,
    state: string
  ): Promise<LicensePlateToVinResponse> {
    //TODO: Abstract into library https://tdalabs.atlassian.net/browse/FIT-544
    const query = `
        {
            licensePlateToVin(lp:"${licensePlate}",state:"${state}", source:"vroom.com"){
                vehicles{
                    vin
                    stateOfRegistration
                    modelYear
                    restrictedStateIndicator
                    make
                }
            }
        }`.trim();
    const data = { query };
    const response = await this.axiosInstance.post(this.hostUrl, data);
    return response.data as LicensePlateToVinResponse;
  }
}
