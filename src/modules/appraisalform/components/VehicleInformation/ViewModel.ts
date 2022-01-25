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
      let alternatives, features, id;
      const { dataProviderInfo, vehicleInfo } = response.data;

      if (dataProviderInfo.carstory) {
        alternatives = dataProviderInfo.carstory.alternatives || [];
        features = dataProviderInfo.carstory.features || [];
        id = dataProviderInfo.carstory.id || null;
      } else if (dataProviderInfo.nada) {
        alternatives = dataProviderInfo.nada.alternatives || [];
        features = dataProviderInfo.nada.features || [];
        id = dataProviderInfo.nada.id || null;
      } else {
        alternatives = [];
        features = [];
        id = null;
      }

      this.appraisalStore.setVehicleData({
        ...response.data.vehicleInfo,
        alternatives,
        features,
      });

      return {
        alternatives,
        features,
        exteriorColor: vehicleInfo.exteriorColor,
        year: vehicleInfo.year,
        make: vehicleInfo.make,
        model: vehicleInfo.model,
        trim: vehicleInfo.trim,
        vin: vehicleInfo.vin,
        id,
      };
    } catch (error) {
      return error;
    }
  }

  async getTrimFeatures(trimId: number): Promise<any> {
    try {
      const response = await getCarstoryTrimFeatures(trimId);
      if (isErrorResponse(response)) throw response;
      const { dataProviderInfo } = response.data;

      const features = dataProviderInfo.carstory
        ? dataProviderInfo.carstory.features
        : [];

      this.appraisalStore.setVehicleFeatureData({
        features,
      });

      return {
        features,
      };
    } catch (error) {
      return error;
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
    } catch (error) {
      return error;
    }
  }
}

export default VehicleInfoViewModel;
