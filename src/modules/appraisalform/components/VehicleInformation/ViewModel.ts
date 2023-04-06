import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';
import { isErrorResponse } from '@vroom-web/networking';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import {
  getCarstoryTrimFeatures,
  getCarstoryVinDecode,
  getGradeCheck,
} from 'src/networking/request';
import Store from 'src/store';
import { AppraisalStore } from 'src/store/appraisalStore';

class VehicleInfoViewModel {
  private _analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  appraisalStore: AppraisalStore;
  absmartly: ABSmartlyContextValue;

  constructor(public store: Store, absmartly: ABSmartlyContextValue) {
    this.appraisalStore = store.appraisal;
    this.absmartly = absmartly;
  }

  get isTradeIn(): boolean {
    return this.store.appraisal.isTradeIn;
  }

  get getAnalyticHandler(): AnalyticsHandler {
    return this._analyticsHandler;
  }

  get vehicleId(): string {
    return this.appraisalStore.vehicleId;
  }

  get isABSmartlyLoading(): boolean {
    return this.absmartly.isLoading;
  }

  get isHideHowManyKeysExperiment(): boolean {
    return this.absmartly.isInExperiment(
      'appraisal-hide-how-many-keys-question'
    );
  }

  get isCTAColorExp(): boolean {
    return this.absmartly.isInExperiment(
      'appraisal-form-all-cta-buttons-color'
    );
  }

  get vehicleDecodeData(): any {
    return this.appraisalStore.vehicleDecodeData;
  }

  trackMileageChange = (): void => {
    this._analyticsHandler.trackMileageChange(
      this.appraisalStore.eventCategory
    );
  };

  async getVinDecode(vehicleId: string, captchaToken: string): Promise<any> {
    try {
      const response = await getCarstoryVinDecode(vehicleId, captchaToken);

      if (isErrorResponse(response)) throw response;
      let alternatives = [];
      let features = [];
      let id = null;
      let style = null;
      const { dataProviderInfo, vehicleInfo } = response.data;

      if (dataProviderInfo.carstory) {
        alternatives = dataProviderInfo.carstory.alternatives || [];
        features = dataProviderInfo.carstory.features || [];
        id = dataProviderInfo.carstory.id || null;
        style = dataProviderInfo.carstory.style || null;
      } else if (dataProviderInfo.nada) {
        alternatives = dataProviderInfo.nada.alternatives || [];
        features = dataProviderInfo.nada.features || [];
        id = dataProviderInfo.nada.id || null;
      }

      this.appraisalStore.setVehicleData({
        ...response.data.vehicleInfo,
        alternatives,
        features,
        style,
      });

      return {
        alternatives,
        features,
        style,
        exteriorColor: vehicleInfo.exteriorColor,
        year: vehicleInfo.year,
        make: vehicleInfo.make,
        model: vehicleInfo.model,
        trim: vehicleInfo.trim,
        subTrim: vehicleInfo.subTrim,
        vin: vehicleInfo.vin,
        id,
      };
    } catch (error) {
      return error;
    }
  }

  trackSubmit(label: string) {
    this._analyticsHandler.trackLicenseToVin(
      label,
      this.appraisalStore.eventCategory
    );
  }

  async getTrimFeatures(
    trimId: number,
    captchaToken: string | null
  ): Promise<any> {
    try {
      const response = await getCarstoryTrimFeatures(trimId, captchaToken);
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
