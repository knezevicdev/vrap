import Navigation, { DealStepsEnum } from "./Navigation";
import { GQLTypes } from "@vroom-web/networking";
import * as utils from 'src/networking/util/getCurrentVin';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: { BASE_PATH: '/checkout' },
}));

const navigation = new Navigation();
const spy = jest.spyOn(utils, 'getCurrentVin');
spy.mockImplementation(() => "XYXYXYXYXYXYX")

global.window = Object.create(window);

describe('Testing navigation', () => {

 it('Resting Regular step back', () => { 
  
    const url = "/e2e/XYXYXYXYXYXYX/registration";

    Object.defineProperty(window, 'location', {
      value: {
        href: url
      }
    });

    const dealStatus: GQLTypes.DealStatus  = {
        status: "In-Progress",
        step: "DeliveryAddress",
        pastSteps: [
          "RegistrationAddress"
        ],
        frozen: false,
        reason: null,
        errorDetail: null,
        interestedInTrade: false,
        canBeCancelled: false,
        plateWillBeTransferred: true,
        backendProductsStepDone: false,
        docUploadStepDone: false,
        fastShipping: false
      };
      
    navigation.stepBack(dealStatus, DealStepsEnum.VEHICLE_TRADE_IN);
    expect(window.location.href).toEqual(url);   

  });

  it('Testing when pastStep is null', () => { 
 
    //Should go the ROOT Step checkoutTradeIn
    const url = "/e2e/XYXYXYXYXYXYX/checkoutTradeIn"; 

    Object.defineProperty(window, 'location', {
      value: {
        href: url
      }
    });

    const dealStatus: GQLTypes.DealStatus  = {
        status: "In-Progress",
        step: "DeliveryAddress",
        pastSteps: null,
        frozen: false,
        reason: null,
        errorDetail: null,
        interestedInTrade: false,
        canBeCancelled: false,
        plateWillBeTransferred: true,
        backendProductsStepDone: false,
        docUploadStepDone: false,
        fastShipping: false
      };
      
    navigation.stepBack(dealStatus, DealStepsEnum.VEHICLE_TRADE_IN);
    expect(window.location.href).toEqual(url);   

  });

  /**
   * We can have the current step equal to the past steps
   */
  it('If the last step is the same like the current step', () => { 
 
    //The past step is the same as the current step so we need to look the last step before this one
    //if there not step it should be null and we should take the user to the root
    const url = "/e2e/XYXYXYXYXYXYX/checkoutTradeIn"; 

    Object.defineProperty(window, 'location', {
      value: {
        href: url
      }
    });

    const dealStatus: GQLTypes.DealStatus  = {
        status: "In-Progress",
        step: "DeliveryAddress",
        pastSteps: [
          "TradeInVehicle"
        ],
        frozen: false,
        reason: null,
        errorDetail: null,
        interestedInTrade: false,
        canBeCancelled: false,
        plateWillBeTransferred: true,
        backendProductsStepDone: false,
        docUploadStepDone: false,
        fastShipping: false
      };
      
    navigation.stepBack(dealStatus, DealStepsEnum.VEHICLE_TRADE_IN);
    expect(window.location.href).toEqual(url);   

  });

   /**
   * Including the 
   */
  it('If include the current step on the list the the one before', () => { 
 
    //if the current step is in the pastStep object get the index and subtract (1) to get the last before the current step
    const url = "/e2e/XYXYXYXYXYXYX/registration"; 

    Object.defineProperty(window, 'location', {
      value: {
        href: url
      }
    });

    const dealStatus: GQLTypes.DealStatus  = {
        status: "In-Progress",
        step: "DeliveryAddress",
        pastSteps: [
          "RegistrationAddress", //<======== Should take this one registration
          "TradeInVehicle" //This is the current step (DealStepsEnum.VEHICLE_TRADE_IN)
        ],
        frozen: false,
        reason: null,
        errorDetail: null,
        interestedInTrade: false,
        canBeCancelled: false,
        plateWillBeTransferred: true,
        backendProductsStepDone: false,
        docUploadStepDone: false,
        fastShipping: false
      };
      
    navigation.stepBack(dealStatus, DealStepsEnum.VEHICLE_TRADE_IN);
    expect(window.location.href).toEqual(url);   

  });

});