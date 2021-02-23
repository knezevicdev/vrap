import dayjs from 'dayjs';

import ShipmentsModel from '../../../Model';
import Model from '../Model';
import ViewModel from '../ViewModel';

describe('Book ViewModel', () => {
  describe('pickupDate', () => {
    test('valid date', () => {
      const viewModel = new ViewModel(
        new Model(1, 2, 3, new ShipmentsModel('person@vroom.com'))
      );
      viewModel.pickupDate = '2099-01-13';
      expect(viewModel.pickupDate).toEqual('2099-01-13');
    });

    test('date before today', () => {
      const viewModel = new ViewModel(
        new Model(1, 2, 3, new ShipmentsModel('person@vroom.com'))
      );
      viewModel.pickupDate = '2020-01-13';
      expect(viewModel.pickupDate).toEqual(dayjs().format('YYYY-MM-DD'));
    });

    test('empty string', () => {
      const viewModel = new ViewModel(
        new Model(1, 2, 3, new ShipmentsModel('person@vroom.com'))
      );
      viewModel.pickupDate = '';
      expect(viewModel.pickupDate).toEqual(dayjs().format('YYYY-MM-DD'));
    });

    test('invalid string', () => {
      const viewModel = new ViewModel(
        new Model(1, 2, 3, new ShipmentsModel('person@vroom.com'))
      );
      viewModel.pickupDate = 'abc';
      expect(viewModel.pickupDate).toEqual(dayjs().format('YYYY-MM-DD'));
    });
  });

  describe('deliveryDate', () => {
    test('valid date', () => {
      const viewModel = new ViewModel(
        new Model(1, 2, 3, new ShipmentsModel('person@vroom.com'))
      );
      viewModel.pickupDate = '2121-01-13';
      viewModel.deliveryDate = '2121-01-14';
      expect(viewModel.deliveryDate).toEqual('2121-01-14');
    });

    test('date before pickup date', () => {
      const viewModel = new ViewModel(
        new Model(1, 2, 3, new ShipmentsModel('person@vroom.com'))
      );
      viewModel.pickupDate = '2121-01-13';
      viewModel.deliveryDate = '2021-01-13';
      expect(viewModel.deliveryDate).toEqual('2121-01-14');
    });

    test('pickup date same as previously set delivery date', () => {
      const viewModel = new ViewModel(
        new Model(1, 2, 3, new ShipmentsModel('person@vroom.com'))
      );
      viewModel.pickupDate = '2121-01-13';
      viewModel.deliveryDate = '2121-01-14';
      viewModel.pickupDate = '2121-01-14';
      expect(viewModel.pickupDate).toEqual('2121-01-14');
      expect(viewModel.deliveryDate).toEqual('2121-01-15');
    });

    test('empty string', () => {
      const viewModel = new ViewModel(
        new Model(1, 2, 3, new ShipmentsModel('person@vroom.com'))
      );
      viewModel.deliveryDate = '';
      expect(viewModel.deliveryDate).toEqual(viewModel.deliveryDateMin);
    });

    test('invalid string', () => {
      const viewModel = new ViewModel(
        new Model(1, 2, 3, new ShipmentsModel('person@vroom.com'))
      );
      viewModel.deliveryDate = 'abc';
      expect(viewModel.deliveryDate).toEqual(viewModel.deliveryDateMin);
    });
  });

  describe('disabled submit', () => {
    test('all valid values', () => {
      const viewModel = new ViewModel(
        new Model(1, 2, 3, new ShipmentsModel('person@vroom.com'))
      );
      viewModel.pickupDate = '2121-01-13';
      viewModel.deliveryDate = '2121-01-14';
      viewModel.shippingCost = '1.00';
      expect(viewModel.disabled).toBe(false);
    });

    test('invalid shippingCost', () => {
      const viewModel = new ViewModel(
        new Model(1, 2, 3, new ShipmentsModel('person@vroom.com'))
      );
      viewModel.pickupDate = '2121-01-13';
      viewModel.deliveryDate = '2121-01-14';
      viewModel.shippingCost = '0.00';
      expect(viewModel.disabled).toBe(true);
    });
  });
});
