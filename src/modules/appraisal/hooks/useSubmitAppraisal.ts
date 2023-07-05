import { isErrorResponse } from '@vroom-web/networking';
import { NextRouter } from 'next/router';

import AnalyticsHandler from '../../../integrations/AnalyticsHandler';
import { AppraisalPayload } from '../../../interfaces.d';
import { AppraisalRespData } from '../../../networking/models/Appraisal';
import {
  postAppraisalReview,
  submitWeblead,
} from '../../../networking/request';
import useAppraisalStore from '../../../store/appraisalStore';
import useOfferStore from '../../../store/offerStore';
import { makeRequestBody } from '../utils';

const useSubmitAppraisal = (
  router: NextRouter,
  signatureToken: string,
  isTradeIn: boolean
) => {
  const getOfferDetail = useOfferStore((state) => state.getOfferDetail);
  const setShowOfferDialog = useOfferStore((state) => state.setShowOfferDialog);

  return async (token: string) => {
    try {
      useAppraisalStore.getState().clearReviewError();

      const requestPayload: AppraisalPayload = makeRequestBody();

      // temporary solution for adding flag for active test
      if (requestPayload.additionalDetails.length)
        requestPayload.additionalDetails += ' ';
      requestPayload.additionalDetails += `suyc-condition-category-questions: true`;

      const leadTrackingData = {
        email: requestPayload.email,
        phone: requestPayload.phoneNumber,
        lead_id: requestPayload.lead_id,
      };

      new AnalyticsHandler().trackLeadSubmitted('Appraisal', leadTrackingData);

      const webleadData = {
        firstName: requestPayload.firstName,
        lastName: requestPayload.lastName,
        email: requestPayload.email,
        phone: requestPayload.phoneNumber,
        correlationId: requestPayload.lead_id,
      };

      try {
        const leadResp = await submitWeblead(webleadData);
        if (isErrorResponse(leadResp)) throw leadResp;
      } catch (err) {
        console.log(JSON.stringify(err));
      }

      const resp = await postAppraisalReview(
        requestPayload,
        token,
        signatureToken
      );
      if (isErrorResponse(resp)) throw resp;
      const returnData: AppraisalRespData = resp.data;

      if (isTradeIn) {
        const offerDetailData = {
          make: returnData.data.Make__c,
          model: returnData.data.Model__c,
          price: returnData.data.Price__c,
          trim: returnData.data.Trim__c,
          year: returnData.data.Year__c,
          miles: returnData.data.miles,
          offerExpiration: returnData.data.Good_Until__c,
          vin: returnData.data.VIN__c,
          id: returnData.data.ID,
          offerId: returnData.data.offer_id,
          offerStatus: returnData.data.offer_status,
          email: returnData.data.user_email,
          offerZip: returnData.data.zipcode,
        };
        getOfferDetail(offerDetailData);
        setShowOfferDialog(true);
      } else {
        useAppraisalStore.getState().clearAppraisal();
        router
          .push({
            pathname: `/appraisal/price`,
            query: { priceId: returnData.data.ID },
          })
          .catch((e) => {
            console.error(e);
          });
      }
    } catch (err) {
      useAppraisalStore.getState().setReviewError();
      console.log(JSON.stringify(err));
    }
  };
};

export default useSubmitAppraisal;
