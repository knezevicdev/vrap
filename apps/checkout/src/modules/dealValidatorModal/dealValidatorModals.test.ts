import { Response } from '@vroom-web/networking';

import Deals from '../../core/mockData/deals.json';
import Model from './Model';
import ViewModel, { modalContentMap, ModalContentMapEnum } from './ViewModel';

import * as Request from 'src/networking/request';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: { BASE_PATH: '/checkout' },
}));

describe('Deal Validator', () => {
  it('Show Pending deal Modal for all pages except documentUpload and Congratulations', async () => {
    const spy = jest.spyOn(Request, 'getDealValidator');
    const fn = (Promise.resolve(Deals[4]) as unknown) as Promise<
      Response<Request.DealValidatorData>
    >;
    spy.mockReturnValue(fn);

    const model = new Model();
    await model.getData();

    const viewModel = new ViewModel(model);
    viewModel.getModal();

    //Selecting Pending Modal
    const selectModal = modalContentMap(ModalContentMapEnum.PENDING_PURCHASE);
    expect(viewModel.modalContent?.component).toBe(selectModal.component);
  });

  it('Show Vehicle sold modal', async () => {
    const spy = jest.spyOn(Request, 'getDealValidator');
    const fn = (Promise.resolve(Deals[1]) as unknown) as Promise<
      Response<Request.DealValidatorData>
    >;
    spy.mockReturnValue(fn);

    const model = new Model();
    await model.getData();

    const viewModel = new ViewModel(model);

    viewModel.getModal();

    //Selecting Pending Modal
    const selectModal = modalContentMap(ModalContentMapEnum.VEHICLE_SOLD);
    expect(viewModel.modalContent?.component).toBe(selectModal.component);
  });

  it('Show deposit Captured Modal', async () => {
    const spy = jest.spyOn(Request, 'getDealValidator');
    const fn = (Promise.resolve(Deals[2]) as unknown) as Promise<
      Response<Request.DealValidatorData>
    >;
    spy.mockReturnValue(fn);

    const model = new Model();
    await model.getData();

    const viewModel = new ViewModel(model);

    viewModel.getModal();

    //Selecting Pending Modal
    const selectModal = modalContentMap(ModalContentMapEnum.DEPOSIT_CAPTURED);
    expect(viewModel.modalContent?.component).toBe(selectModal.component);
  });
});
