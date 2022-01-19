import { isErrorResponse } from '@vroom-web/networking';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import {
  getCarstoryTrimFeatures,
  getCarstoryVinDecode,
  getGradeCheck,
} from 'src/networking/request';
import store from 'src/store';
import { ABSmartStore } from 'src/store/abSmartStore';
import { AppraisalStore } from 'src/store/appraisalStore';

class VehicleInfoViewModel {
  private _analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  appraisalStore: AppraisalStore;
  absmartly: ABSmartStore;

  constructor(public store: store) {
    this.appraisalStore = store.appraisal;
    this.absmartly = store.absmart;
  }

  get getAnalyticHandler(): AnalyticsHandler {
    return this._analyticsHandler;
  }

  get vehicleId(): string {
    return this.appraisalStore.vehicleId;
  }

  get isHideHowManyKeysExperiment(): boolean {
    return this.absmartly.isInExperiment(
      'appraisal-hide-how-many-keys-question'
    );
  }

  get vehicleDecodeData(): any {
    return this.appraisalStore.vehicleDecodeData;
  }

  trackMileageChange = (): void => {
    this._analyticsHandler.trackMileageChange();
  };

  async getVinDecode(vehicleId: string): Promise<any> {
    try {
      const response = await getCarstoryVinDecode(vehicleId);
      if (isErrorResponse(response)) throw response;
      let alternatives, features;

      if (response.dataProviderInfo.carstory) {
        alternatives = response.dataProviderInfo.carstory.alternatives || [];
        features = response.dataProviderInfo.carstory.features || [];
      } else if (response.dataProviderInfo.nada) {
        alternatives = response.dataProviderInfo.nada.alternatives || [];
        features = response.dataProviderInfo.nada.features || [];
      } else {
        alternatives = [];
        features = [];
      }

      this.appraisalStore.setVehicleData({
        ...response.vehicleInfo,
        alternatives,
        features,
      });

      return {
        alternatives,
        features,
        exteriorColor: response.vehicleInfo.exteriorColor,
        year: response.vehicleInfo.year,
        make: response.vehicleInfo.make,
        model: response.vehicleInfo.model,
        trim: response.vehicleInfo.trim,
        vin: response.vehicleInfo.vin,
      };
    } catch (e) {
      console.log('error in Vin Decode');
    }
  }

  async getTrimFeatures(trimId: number): Promise<any> {
    try {
      const response = await getCarstoryTrimFeatures(trimId);
      if (isErrorResponse(response)) throw response;

      const features = response.dataProviderInfo.carstory
        ? response.dataProviderInfo.carstory.features
        : [];

      this.appraisalStore.setVehicleFeatureData({
        features,
      });

      return {
        features,
      };
    } catch (e) {
      console.log('error in Trim Features');
    }
  }

  async gradeCheck(
    make: string,
    model: string,
    trim: string,
    miles: number,
    vin: string
  ): Promise<any> {
    try {
      const response = await getGradeCheck(make, model, trim, miles, vin);
      if (isErrorResponse(response)) throw response;

      this.appraisalStore.setGradeCheck(response.data);

      return response.data;
    } catch (e) {
      console.log('error in gradeCheck');
    }
  }
}

export default VehicleInfoViewModel;
