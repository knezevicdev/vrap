export interface PriceResponse {
  data: any;
}

export interface Price {
  automated_appraisal: boolean;
  ID: string;
  Price__c: number;
  Year__c: number;
  Make__c: string;
  Model__c: string;
  Trim__c: string;
  miles: number;
  Good_Until__c: string;
  VIN__c: string;
  offer_id: number;
  created: string;
  offer_status: string;
  user_email: string;
  active: boolean;
  new_offer: boolean | null;
  verification_url: string | null;
  tax_credit_savings: number | null;
}

