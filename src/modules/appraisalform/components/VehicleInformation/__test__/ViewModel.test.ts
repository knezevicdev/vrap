jest.mock('src/networking/request');

import ViewModel from '../ViewModel';

import * as Request from 'src/networking/request';
import {
  getCarstoryTrimFeatures,
  getCarstoryVinDecode,
  gradeCheck,
} from 'src/networking/request/__mocks__';
import store from 'src/store';

const vehicleInfo = {
  vin: 'abc123',
  exteriorColor: 'silver',
  keysAmount: '1',
  make: 'NISSAN',
  mileage: 999999,
  model: 'Murano',
  trim: 'Utility 4D SV 2WD V6',
  vehicleOptions: ['manual', 'window'],
  year: 2016,
};

const respCarStory = {
  vehicleInfo,
  dataProviderInfo: {
    carstory: {
      alternatives: ['alternatives_one'],
      id: '123',
      features: ['features_one'],
      style: 'carstory_style',
    },
  },
};

const respNada = {
  vehicleInfo,
  dataProviderInfo: {
    nada: {
      alternatives: ['alternatives_one_nada'],
      id: '123_nada',
      features: ['features_one_nada'],
      style: null,
    },
  },
};

const respWithEmpty = {
  vehicleInfo,
  dataProviderInfo: {},
};

describe('AppraisalForm VehicleInformation component test', () => {
  const stores = new store();
  let viewModel: ViewModel;
  const captchaToken = 'fake_captcha_token';

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test vehicleId', () => {
    stores.appraisal.setVehicleId('123');
    expect(viewModel.vehicleId).toEqual('123');
  });

  it('test vehicleDecodeData', () => {
    stores.appraisal.setVehicleData(vehicleInfo);
    expect(viewModel.vehicleDecodeData).toEqual(vehicleInfo);
  });

  it('test trackMileageChange should called', () => {
    const analyticHandler = viewModel.getAnalyticHandler;
    const spyAnalytic = jest.spyOn(analyticHandler, 'trackMileageChange');
    viewModel.trackMileageChange();
    expect(spyAnalytic).toHaveBeenCalled();
  });

  it('test getTrimFeatures ', async () => {
    const requestSpy = jest.spyOn(Request, 'getCarstoryTrimFeatures');
    const spyStore = jest.spyOn(stores.appraisal, 'setVehicleFeatureData');
    requestSpy.mockResolvedValueOnce(getCarstoryTrimFeatures());
    await viewModel.getTrimFeatures(123, captchaToken);
    expect(requestSpy).toHaveBeenCalled();
    expect(spyStore).toHaveBeenCalledWith({
      features: ['feature_one', 'feature_two'],
    });
  });

  it('test getTrimFeatures return value ', async () => {
    const requestSpy = jest.spyOn(Request, 'getCarstoryTrimFeatures');
    requestSpy.mockResolvedValueOnce(getCarstoryTrimFeatures());
    const resp = await viewModel.getTrimFeatures(123, captchaToken);
    expect(resp).toEqual({
      features: ['feature_one', 'feature_two'],
    });
  });

  it('test grade check', async () => {
    const requestSpy = jest.spyOn(Request, 'getGradeCheck');
    const storeSpy = jest.spyOn(stores.appraisal, 'setGradeCheck');
    requestSpy.mockResolvedValueOnce(gradeCheck());
    await viewModel.gradeCheck('Nissan', 'Rogue', 'sports', 10000, '123');
    expect(requestSpy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledWith({ grade: true });
  });

  it('test grade check return value ', async () => {
    const requestSpy = jest.spyOn(Request, 'getGradeCheck');
    requestSpy.mockResolvedValueOnce(gradeCheck());
    const resp = await viewModel.gradeCheck(
      'Nissan',
      'Rogue',
      'sports',
      10000,
      '123'
    );
    expect(resp).toEqual({
      grade: true,
    });
  });

  it('test getCarstoryVinDecode api resolve carstory', async () => {
    const requestSpy = jest.spyOn(Request, 'getCarstoryVinDecode');
    const storeSpy = jest.spyOn(stores.appraisal, 'setVehicleData');
    requestSpy.mockResolvedValueOnce(getCarstoryVinDecode(respCarStory));
    await viewModel.getVinDecode('123', captchaToken);
    expect(requestSpy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledWith({
      ...vehicleInfo,
      alternatives: ['alternatives_one'],
      features: ['features_one'],
      style: 'carstory_style',
    });
  });

  it('test getCarstoryVinDecode api resolve carstory return value', async () => {
    const requestSpy = jest.spyOn(Request, 'getCarstoryVinDecode');
    jest.spyOn(stores.appraisal, 'setVehicleData');
    requestSpy.mockResolvedValueOnce(getCarstoryVinDecode(respCarStory));
    const resp = await viewModel.getVinDecode('123', captchaToken);

    expect(resp).toEqual({
      alternatives: ['alternatives_one'],
      features: ['features_one'],
      id: '123',
      exteriorColor: 'silver',
      year: 2016,
      make: 'NISSAN',
      model: 'Murano',
      trim: 'Utility 4D SV 2WD V6',
      vin: 'abc123',
      style: 'carstory_style',
    });
  });

  it('test getCarstoryVinDecode api resolve nada', async () => {
    const requestSpy = jest.spyOn(Request, 'getCarstoryVinDecode');
    const storeSpy = jest.spyOn(stores.appraisal, 'setVehicleData');
    requestSpy.mockResolvedValueOnce(getCarstoryVinDecode(respNada));
    await viewModel.getVinDecode('123', captchaToken);
    expect(requestSpy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledWith({
      ...vehicleInfo,
      alternatives: ['alternatives_one_nada'],
      features: ['features_one_nada'],
      style: null,
    });
  });

  it('test getCarstoryVinDecode api resolve empty dataProviderInfo', async () => {
    const requestSpy = jest.spyOn(Request, 'getCarstoryVinDecode');
    const storeSpy = jest.spyOn(stores.appraisal, 'setVehicleData');
    requestSpy.mockResolvedValueOnce(getCarstoryVinDecode(respWithEmpty));
    await viewModel.getVinDecode('123', captchaToken);
    expect(requestSpy).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledWith({
      ...vehicleInfo,
      alternatives: [],
      features: [],
      style: null,
    });
  });
});
