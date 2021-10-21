import { isErrorResponse } from '@vroom-web/networking';
import { makeAutoObservable } from 'mobx';

import { Verification } from 'src/networking/models/Price';
import {
  DocumentInfo,
  OwnerInfo,
  PayoffInfo,
  PickupInfo,
} from 'src/networking/models/Verification';
import { getDownloadUrl } from 'src/networking/request';

const BankOptions = [
  {
    label: 'Ally Financial',
    value: 'A_Ally_Financial',
    phone: '(888) 919-2559',
  },
  {
    label: 'Bank of America',
    value: 'A_Bank_of_America',
    phone: '(800) 215-6195',
  },
  {
    label: 'BMW Financial Services',
    value: 'A_BMW_Financial_Services',
    phone: '(800) 576-5000',
  },
  {
    label: 'Bridgecrest Acceptance Corp',
    value: 'A_Bridgecrest_Acceptance_Corp',
    phone: '(800) 967-8526',
  },
  {
    label: 'Capital One Auto Finance',
    value: 'A_Capital_One_Auto_Finance',
    phone: '(800) 946-0332',
  },
  {
    label: 'Carmax Auto Finance',
    value: 'A_Carmax_Auto_Finance',
    phone: '(800) 759-4091',
  },
  {
    label: 'Chase Auto Finance',
    value: 'A_Chase_Auto_Finance',
    phone: '(800) 223-5050',
  },
  {
    label: 'Chrysler Capital',
    value: 'A_Chrysler_Capital',
    phone: '(855) 563-5635',
  },
  { label: 'Fifth Third', value: 'A_Fifth_Third', phone: '(800) 972-3030' },
  { label: 'Ford Credit', value: 'A_Ford_Credit', phone: '(800) 727-7000' },
  { label: 'GM Financial', value: 'A_GM_Financial', phone: '(800) 284-2271' },
  {
    label: 'Honda Finance Exchange Inc',
    value: 'A_Honda_Finance_Exchange_Inc',
    phone: '(800) 448-9307',
  },
  {
    label: 'Hyundai Motor Finance',
    value: 'A_Hyundai_Motor_Finance',
    phone: '(800) 523-4030',
  },
  {
    label: 'Infiniti Financial Services',
    value: 'A_Infiniti_Financial_Services',
    phone: '(800) 627-4437',
  },
  {
    label: 'JSC Federal Credit Union',
    value: 'A_JSC_Federal_Credit_Union',
    phone: '(281) 488-7070',
  },
  {
    label: 'Lexus Financial Services',
    value: 'A_Lexus_Financial_Services',
    phone: '(800) 874-7050',
  },
  {
    label: 'Mercedes Benz Financial Services',
    value: 'A_Mercedes_Benz_Financial_Services',
    phone: '(800) 654-6222',
  },
  {
    label: 'Navy Federal Credit Union',
    value: 'A_Navy_Federal_Credit_Union',
    phone: '(888) 842-6328',
  },
  {
    label: 'Nissan Motor Acceptance Corporation',
    value: 'A_Nissan_Motor_Acceptance_Corporation',
    phone: '(800) 456-6622',
  },
  { label: 'PNC Bank', value: 'A_PNC_Bank', phone: '(888) 762-2265' },
  {
    label: 'Santander Consumer USA',
    value: 'A_Santander_Consumer_USA',
    phone: '(888) 222-4227',
  },
  {
    label: 'SunTrust Bank',
    value: 'A_SunTrust_Bank',
    phone: '(888) 461-8862',
  },
  {
    label: 'TD Auto Finance',
    value: 'A_TD_Auto_Finance',
    phone: '(800) 556-8172',
  },
  {
    label: 'Toyota Financial Services',
    value: 'A_Toyota_Financial_Services',
    phone: '(800) 874-8822',
  },
  { label: 'US Bank NA', value: 'A_US_Bank_NA', phone: '(800) 872-2657' },
  {
    label: 'USAA Federal Savings Bank',
    value: 'A_USAA_Federal_Savings_Bank',
    phone: '(800) 531-8722',
  },
  { label: 'Volkswagen', value: 'A_Volkswagen', phone: '(800) 428-4034' },
  {
    label: 'Wells Fargo Auto Finance',
    value: 'A_Wells_Fargo_Auto_Finance',
    phone: '(800) 559-3557',
  },
  {
    label: 'Wells Fargo Dealer Services',
    value: 'A_Wells_Fargo_Dealer_Services',
    phone: '(800) 289-8004',
  },
  { label: 'Other', value: 'Other', phone: '' },
];

export class VerificationStore {
  verificationDetail?: Verification;
  offerId?: string;
  ownerInfo?: OwnerInfo;
  pickupInfo?: PickupInfo;
  payoffInfo?: PayoffInfo;
  formState?: number;
  exactMileage?: number;
  documents?: DocumentInfo[];
  loading = false;
  priceId?: string;
  bankOptions = BankOptions;
  whereIsVehicleRegistered = '';
  constructor() {
    makeAutoObservable(this);
  }

  setWhereIsVehicleRegistered(value: string): void {
    this.whereIsVehicleRegistered = value;
  }

  setPriceId(priceId: string): void {
    this.priceId = priceId;
  }

  getVerificationDetail(data: Verification, lastFourSSN: string): void {
    this.verificationDetail = {
      ...data,
      last_four_ssn: lastFourSSN,
    };
    this.processVerificationData(data);
  }

  async processVerificationData(data: Verification): Promise<void> {
    this.offerId = data.offer_id;
    this.formState = data.form_state;
    this.exactMileage = data.exact_mileage;
    const bankOption = this.bankOptions.find(
      (obj) => obj.value === data.lien_financial_institution_name
    );
    const bankOptionOther = this.bankOptions.find(
      (obj) => obj.value === 'Other'
    );
    const payoffInfoBank = bankOption || bankOptionOther;
    const payoffInfoLien = bankOption
      ? ''
      : data.lien_financial_institution_name;

    const docIDs = [
      { fileType: 'odometer-information', id: data.mileage_file_id },
      {
        fileType: 'title-information-front',
        id: data.front_of_title_lien_file_id,
      },
      {
        fileType: 'title-information-back',
        id: data.back_of_title_lien_file_id,
      },
      {
        fileType: 'drivers-license-front',
        id: data.front_of_driver_license_file_id,
      },
      {
        fileType: 'second-drivers-license-back',
        id: data.second_owner_back_of_driver_license_file_id,
      },
      {
        fileType: 'second-drivers-license-front',
        id: data.second_owner_front_of_driver_license_file_id,
      },
      {
        fileType: 'drivers-license-back',
        id: data.back_of_driver_license_file_id,
      },
      { fileType: 'registration', id: data.current_registration_file_id },
      { fileType: 'lien-release-letter', id: data.lien_release_letter_file_id },
    ];

    const documents = await Promise.all(
      docIDs
        .filter((doc) => doc.id !== null && doc.id.length)
        .map(async (doc) => {
          const fileDownloadData = await getDownloadUrl(doc.id, data.offer_id);
          if (isErrorResponse(fileDownloadData)) throw fileDownloadData;
          const responseData = fileDownloadData.data;
          return {
            ...doc,
            ...responseData.data[0],
            fileURL: responseData.data[0].FileDownloadURL,
            originalFileName: responseData.data[0].OriginalFileName,
            fileExtension: responseData.data[0].FileExtension,
            fileSize: responseData.data[0].FileSize,
          };
        })
    ).catch(() => {
      return [];
    });
    const ownerInfo = {
      primaryOwner: data.is_owner ? 'Yes' : 'No',
      primaryFirst: data.owner_first_name,
      primaryLast: data.owner_last_name,
      primaryCity: data.owner_mailing_address.city,
      primaryState: data.owner_mailing_address.state,
      primaryZip: data.owner_mailing_address.zipcode,
      primaryAddress: data.owner_mailing_address.address_1,
      primaryApartment: data.owner_mailing_address.address_2,
      primaryPhone: data.owner_phone_number,
      primaryEmail: data.owner_email_address,
      secondaryOwner:
        // eslint-disable-next-line no-nested-ternary
        data.owners_on_title === 2
          ? 'Yes'
          : data.owners_on_title === 1
          ? 'No'
          : undefined,
      secondaryFirst: data.second_owner_first_name,
      secondaryLast: data.second_owner_last_name,
      secondaryCity: data.second_owner_mailing_address.city,
      secondaryState: data.second_owner_mailing_address.state,
      secondaryZip: data.second_owner_mailing_address.zipcode,
      secondaryAddress: data.second_owner_mailing_address.address_1,
      secondaryApartment: data.second_owner_mailing_address.address_2,
      secondaryPhone: data.second_owner_phone_number,
      secondaryEmail: data.second_owner_email_address,
    };

    const pickupInfo = {
      primaryPickup:
        // eslint-disable-next-line no-nested-ternary
        data.same_mailing_address !== null
          ? data.same_mailing_address
            ? 'Yes'
            : 'No'
          : undefined,
      pickupCity: data.pickup_address.city,
      pickupState: data.pickup_address.state,
      pickupZip: data.pickup_address.zipcode,
      pickupAddress: data.pickup_address.address_1,
      pickupApartment: data.pickup_address.address_2,
      poc:
        // eslint-disable-next-line no-nested-ternary
        data.same_contact_as_owner !== null
          ? data.same_contact_as_owner
            ? 'Yes'
            : 'No'
          : undefined,
      pocFirst: data.pickup_contact_first_name,
      pocLast: data.pickup_contact_last_name,
      pocPhone: data.pickup_contact_phone_number,
      pocEmail: data.pickup_contact_email,
    };

    const payoffInfo = {
      currentPayments:
        // eslint-disable-next-line no-nested-ternary
        data.current_payments !== null
          ? data.current_payments
            ? 'Yes'
            : 'No'
          : undefined,
      bankName: payoffInfoBank,
      lienFinancialInstitutionName: payoffInfoLien,
      bankPhoneNumber: data.financial_institution_phone,
      loanAccountNumber: data.lien_account_number,
      termsCheckbox: data.acknowledgement_of_terms,
      lastFourSSN: data.last_four_ssn,
      whereIsVehicleRegistered: this.whereIsVehicleRegistered || '',
    };
    this.ownerInfo = ownerInfo;
    this.pickupInfo = pickupInfo;
    this.payoffInfo = payoffInfo;
    this.documents = documents;
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }
}
