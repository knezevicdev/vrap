/* eslint-disable @typescript-eslint/naming-convention */
export interface AppraisalRespData {
  data: {
    Price__c: number;
    Year__c: number;
    Make__c: string;
    Model__c: string;
    Trim__c: string;
    miles: number;
    Good_Until__c: string;
    VIN__c: string;
    ID: string;
    offer_id: number;
    offer_status: string;
    user_email: string;
    zipcode: string;
  };
}
