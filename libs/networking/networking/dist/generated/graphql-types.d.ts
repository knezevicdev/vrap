export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Map: any;
    Time: any;
};
export declare type DealDeleteResult = DeleteDeal | ApiError;
export declare type DeliveryDetails = {
    __typename?: 'DeliveryDetails';
    wheelerTruck: Scalars['Boolean'];
    availableForDelivery: Scalars['Boolean'];
    additionalDetails?: Maybe<Scalars['String']>;
    unavailableDates?: Maybe<Array<Scalars['Time']>>;
    alternateContact?: Maybe<PointOfContact>;
};
export declare type AddressDto = {
    __typename?: 'AddressDTO';
    id: Scalars['Int'];
    type: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    streetLine1: Scalars['String'];
    streetLine2: Scalars['String'];
    city: Scalars['String'];
    county: Scalars['String'];
    state: Scalars['String'];
    country?: Maybe<Scalars['String']>;
    postCode: Scalars['String'];
};
export declare type Check = {
    __typename?: 'Check';
    exists: Scalars['Boolean'];
};
export declare type InvSearchResult = {
    __typename?: 'InvSearchResult';
    hits: Scalars['Int'];
    vehicles?: Maybe<Array<InvSearchVehicleData>>;
    counts?: Maybe<InvSearchCounters>;
};
export declare type Shipping = {
    __typename?: 'Shipping';
    vin: Scalars['String'];
    make: Scalars['String'];
    model: Scalars['String'];
    year: Scalars['Int'];
    inventoryID: Scalars['Int'];
    adventPurchasedFrom: Scalars['String'];
    shipmentName: Scalars['String'];
    carrierID: Scalars['Int'];
    carrierCode: Scalars['String'];
    carrier: Scalars['String'];
    shipmentStatusID: Scalars['Int'];
    shipmentStatus: Scalars['String'];
    enclosed: Scalars['String'];
    cost: Scalars['String'];
    postingDate?: Maybe<Scalars['Time']>;
    bookedDate: Scalars['Time'];
    deliveryNotes: Scalars['String'];
    currentEstPickupDate?: Maybe<Scalars['Time']>;
    originalEstPickupDate?: Maybe<Scalars['Time']>;
    actualPickupDate?: Maybe<Scalars['Time']>;
    currentEstDeliveryDate?: Maybe<Scalars['Time']>;
    originalEstDeliveryDate?: Maybe<Scalars['Time']>;
    actualDeliveryDate?: Maybe<Scalars['Time']>;
    deliveryAddress: ShippingAddress;
    pickupAddress: ShippingAddress;
    deliveryaccountfacilitycode: Scalars['String'];
    deliveryaccountname: Scalars['String'];
    pickupContactName: Scalars['String'];
    pickupContactPhone: Scalars['String'];
    pickupContactEmail: Scalars['String'];
    transitTypeID: Scalars['Int'];
    transitType: Scalars['String'];
    pickupAt?: Maybe<Scalars['Time']>;
    rush: Scalars['Int'];
    billingCompanyName: Scalars['String'];
    billingAddress: ShippingAddress;
    destinationPhoneNumber: Scalars['String'];
    destinationEmailAddress: Scalars['String'];
    destinationNotes: Scalars['String'];
    destinationContactFirstName: Scalars['String'];
    destinationContactLastName: Scalars['String'];
    destinationContactPhone: Scalars['String'];
    destinationContactEmail: Scalars['String'];
    lastMileMove: Scalars['Int'];
};
export declare type VinData = {
    __typename?: 'VinData';
    colorData?: Maybe<ColorData>;
    trimData?: Maybe<TrimData>;
    basicData?: Maybe<BasicData>;
    options?: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    version: Scalars['Int'];
    acceptRejectOffer?: Maybe<Array<AppraisalOffer>>;
    dealAddDeal: DealResult;
    dealAddDocument: DealResult;
    dealDeleteDocument: DealResult;
    dealAddAddress: DealResult;
    dealAddDeliveryDetails: DealResult;
    dealAddPaymentType: DealResult;
    dealToggleAdditionalProducts: DealResult;
    dealAddStatus: DealResult;
    dealDeleteDeal: DealDeleteResult;
    hornCreateDevice: CreateDeviceResult;
    hornCreateSubscription: CreateSubscriptionResult;
    hornDeleteSubscription: Scalars['Boolean'];
    signin: SignedInUser;
    signup: SignedInUser;
    forgotPassword: Scalars['Boolean'];
    confirmPassword: SignedInUser;
    userAddFavoriteVehicles: User;
    userRemoveFavoriteVehicles: User;
    userChangePassword: Scalars['Boolean'];
    userUpdateProfile: Scalars['Boolean'];
};
export declare type MutationAcceptRejectOfferArgs = {
    offerId: Scalars['String'];
    accepted: Scalars['Boolean'];
    reason?: Maybe<Scalars['String']>;
    reasonOther?: Maybe<Scalars['String']>;
    success?: Maybe<Scalars['Boolean']>;
    detail?: Maybe<Scalars['String']>;
};
export declare type MutationDealAddDealArgs = {
    source: Scalars['String'];
    vin: Scalars['String'];
    userName: Scalars['String'];
    firstName: Scalars['String'];
    middleName: Scalars['String'];
    lastName: Scalars['String'];
    phone: Scalars['String'];
};
export declare type MutationDealAddDocumentArgs = {
    source: Scalars['String'];
    dealId: Scalars['Int'];
    docId: Scalars['String'];
    docType: Scalars['String'];
};
export declare type MutationDealDeleteDocumentArgs = {
    source: Scalars['String'];
    dealId: Scalars['Int'];
    docId: Scalars['String'];
};
export declare type MutationDealAddAddressArgs = {
    dealID: Scalars['Int'];
    source: Scalars['String'];
    addressType: AddressType;
    type: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    streetLine1: Scalars['String'];
    streetLine2: Scalars['String'];
    city: Scalars['String'];
    county: Scalars['String'];
    state: Scalars['String'];
    country?: Maybe<Scalars['String']>;
    postCode: Scalars['String'];
};
export declare type MutationDealAddDeliveryDetailsArgs = {
    dealID: Scalars['Int'];
    source: Scalars['String'];
    has18WheelerLimit: Scalars['Boolean'];
    availableForDelivery: Scalars['Boolean'];
    AdditionalDetails?: Maybe<Scalars['String']>;
    blackoutDates?: Maybe<Array<Scalars['Time']>>;
    otherContactFirstName?: Maybe<Scalars['String']>;
    otherContactLastName?: Maybe<Scalars['String']>;
    otherContactPhoneNumber?: Maybe<Scalars['String']>;
};
export declare type MutationDealAddPaymentTypeArgs = {
    dealID: Scalars['Int'];
    source: Scalars['String'];
    paymentType: Scalars['String'];
};
export declare type MutationDealToggleAdditionalProductsArgs = {
    dealID: Scalars['Int'];
    source: Scalars['String'];
    productIDS: Array<Scalars['String']>;
};
export declare type MutationDealAddStatusArgs = {
    dealID: Scalars['Int'];
    source: Scalars['String'];
    plateWillBeTransferred?: Maybe<Scalars['Boolean']>;
    backendProductsStepDone?: Maybe<Scalars['Boolean']>;
    docUploadStepDone?: Maybe<Scalars['Boolean']>;
};
export declare type MutationDealDeleteDealArgs = {
    dealID: Scalars['Int'];
    source: Scalars['String'];
};
export declare type MutationHornCreateDeviceArgs = {
    id: Scalars['String'];
    type: DeviceType;
    segmentId?: Maybe<Scalars['String']>;
    applicationName: Scalars['String'];
};
export declare type MutationHornCreateSubscriptionArgs = {
    subject: Scalars['String'];
    filters: Scalars['String'];
};
export declare type MutationHornDeleteSubscriptionArgs = {
    id: Scalars['String'];
};
export declare type MutationSigninArgs = {
    username: Scalars['String'];
    password: Scalars['String'];
    source: Scalars['String'];
};
export declare type MutationSignupArgs = {
    username: Scalars['String'];
    password: Scalars['String'];
    source: Scalars['String'];
    firstName: Scalars['String'];
    middleName?: Maybe<Scalars['String']>;
    lastName: Scalars['String'];
    phone: Scalars['String'];
    emailMarketingConsent: Scalars['Boolean'];
    smsMarketingConsent: Scalars['Boolean'];
};
export declare type MutationForgotPasswordArgs = {
    email: Scalars['String'];
};
export declare type MutationConfirmPasswordArgs = {
    email: Scalars['String'];
    verificationCode: Scalars['String'];
    newPassword: Scalars['String'];
};
export declare type MutationUserAddFavoriteVehiclesArgs = {
    source: Scalars['String'];
    vin: Scalars['String'];
};
export declare type MutationUserRemoveFavoriteVehiclesArgs = {
    source: Scalars['String'];
    vin: Scalars['String'];
};
export declare type MutationUserChangePasswordArgs = {
    oldPassword: Scalars['String'];
    newPassword: Scalars['String'];
};
export declare type MutationUserUpdateProfileArgs = {
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    phoneNumber: Scalars['String'];
};
export declare type FavoriteVehicles = {
    __typename?: 'FavoriteVehicles';
    vin: Scalars['String'];
};
export declare type LoanPricing = {
    __typename?: 'loanPricing';
    apr: Scalars['Float'];
    amountFinanced: Scalars['Float'];
    buyRate: Scalars['Float'];
    downPayment: Scalars['Float'];
    monthlyPayment: Scalars['Float'];
    termMonths: Scalars['Int'];
};
export declare type DuplicateSubscriptionError = {
    __typename?: 'DuplicateSubscriptionError';
    message: Scalars['String'];
};
export declare type SubscriptionPage = {
    __typename?: 'SubscriptionPage';
    subscriptions?: Maybe<Array<SubjectSubscription>>;
    nextPage?: Maybe<Scalars['Int']>;
};
export declare type Email = {
    __typename?: 'Email';
    type: Scalars['String'];
    email: Scalars['String'];
};
export declare type CreditOfferPreferences = {
    __typename?: 'CreditOfferPreferences';
    apr: Scalars['Float'];
    term: Scalars['Int'];
    downPayment: Scalars['Int'];
    annualMileage: Scalars['Int'];
    requestedOfferType: Scalars['String'];
};
export declare type AdditionalProduct = {
    __typename?: 'AdditionalProduct';
    ID?: Maybe<Scalars['String']>;
    selected: Scalars['Boolean'];
    planCode: Scalars['String'];
    name: Scalars['String'];
    summary: Scalars['String'];
    cost: Scalars['Float'];
    months: Scalars['Int'];
    miles: Scalars['Int'];
    deductible: Scalars['Float'];
    dealerCost: Scalars['Float'];
    maxTerm: Scalars['Int'];
    planSku: Scalars['String'];
    productCode: Scalars['String'];
    retailRate: Scalars['Float'];
};
export declare type Vehicle = {
    __typename?: 'Vehicle';
    year: Scalars['Int'];
    make: Scalars['String'];
    model: Scalars['String'];
    trim?: Maybe<Scalars['String']>;
    miles: Scalars['Int'];
    vin: Scalars['String'];
};
export declare type ConditionData = {
    __typename?: 'ConditionData';
    keysAmount: Scalars['Int'];
    hasAccident: Scalars['String'];
    titleStatus: Scalars['String'];
    interiorCondiotn: Scalars['String'];
    seats: Scalars['String'];
    smokedIn: Scalars['String'];
    exteriorCondition: Scalars['String'];
    tiresAndWheels: Scalars['String'];
    hailDamage: Scalars['String'];
    afterMarket?: Maybe<Array<Scalars['String']>>;
    mechanicalCondition: Scalars['String'];
    runnable: Scalars['String'];
    warningLights: Scalars['String'];
    warningLightsValues?: Maybe<Array<Scalars['String']>>;
    otherWarning?: Maybe<Scalars['String']>;
    floodFireDamage: Scalars['String'];
    additionalDetails?: Maybe<Scalars['String']>;
};
export declare type PointOfContact = {
    __typename?: 'PointOfContact';
    first: Scalars['String'];
    last: Scalars['String'];
    phone: Scalars['String'];
};
export declare type Pricing = {
    __typename?: 'Pricing';
    listPrice: Scalars['Int'];
    msrp: Scalars['Int'];
    blueBookValue: Scalars['Int'];
};
export declare type ErrorDetail = {
    __typename?: 'ErrorDetail';
    message: Scalars['String'];
    path: Scalars['String'];
    property: Scalars['String'];
};
export declare type DefectPhotos = {
    __typename?: 'DefectPhotos';
    url: Scalars['String'];
    defectType: Scalars['String'];
    location: Scalars['String'];
};
export declare type ShippingResult = ShippingArray | ApiError;
export declare type Vehicles = {
    __typename?: 'Vehicles';
    restrictedStateIndicator: Scalars['String'];
    processingType: Scalars['String'];
    vin: Scalars['String'];
    modelYear: Scalars['String'];
    make: Scalars['String'];
    stateOfRegistration: Scalars['String'];
    plateType: Scalars['String'];
    inputLicensePlate: Scalars['String'];
    vinPattern: Scalars['String'];
};
export declare type KeyDisplayPair = {
    __typename?: 'KeyDisplayPair';
    key: Scalars['String'];
    Display: Scalars['String'];
};
export declare enum Role {
    VroomUser = "VROOM_USER"
}
export declare type ShippingArray = {
    __typename?: 'ShippingArray';
    shippings: Array<Shipping>;
};
export declare type TaxItem = {
    __typename?: 'TaxItem';
    totalTax: Scalars['Float'];
    price: Scalars['Float'];
    name: Scalars['String'];
};
export declare type SignedInUser = {
    __typename?: 'SignedInUser';
    accountId: Scalars['Int'];
    accessToken: Scalars['String'];
    refreshToken: Scalars['String'];
    idToken: Scalars['String'];
};
export declare type Account = {
    __typename?: 'Account';
    userName: Scalars['String'];
    firstName: Scalars['String'];
    middleName: Scalars['String'];
    lastName: Scalars['String'];
    phone: Scalars['String'];
};
export declare type File = {
    __typename?: 'File';
    id: Scalars['ID'];
    type: Scalars['String'];
    extension: Scalars['String'];
    originalFileName: Scalars['String'];
    downloadURL: Scalars['String'];
    fileExtension: Scalars['String'];
    isThumbnail: Scalars['String'];
    fileSize: Scalars['Int'];
};
export declare type ColorData = {
    __typename?: 'ColorData';
    source?: Maybe<Scalars['String']>;
    colors?: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type AppraisalOffer = {
    __typename?: 'AppraisalOffer';
    email: Scalars['String'];
    automatedAppraisal: Scalars['Boolean'];
    id: Scalars['String'];
    price?: Maybe<Scalars['Float']>;
    vehicle: Vehicle;
    goodUntil?: Maybe<Scalars['String']>;
    xkeOfferId: Scalars['Int'];
    created: Scalars['Time'];
    offerStatus: Scalars['String'];
    offerEmail: Email;
};
export declare type ApiError = {
    __typename?: 'APIError';
    errorType: ErrorType;
    errorTitle: Scalars['String'];
    errorDetail: Scalars['String'];
};
export declare type LoanDecision = {
    __typename?: 'LoanDecision';
    isAccepted: Scalars['Boolean'];
    middleman: Scalars['String'];
    middlemanReferenceID: Scalars['String'];
    name: Scalars['String'];
    state: Scalars['String'];
    pricing: LoanPricing;
};
export declare type AutoFiResponse = {
    __typename?: 'AutoFiResponse';
    url: Scalars['String'];
    loanApplicationID: Scalars['String'];
    customerProfile: Scalars['String'];
    loanApplicationExpires: Scalars['String'];
    referenceID: Scalars['String'];
};
export declare type SubjectSubscription = {
    __typename?: 'SubjectSubscription';
    subject: Subject;
    id: Scalars['String'];
    filters: Scalars['String'];
};
export declare type CreateDeviceResult = Device | ValidationError;
export declare type Subject = {
    __typename?: 'Subject';
    path: Scalars['String'];
    name?: Maybe<Scalars['String']>;
};
export declare type CreditApplication = {
    __typename?: 'CreditApplication';
    offerPreferences: CreditOfferPreferences;
};
export declare type DealStatus = {
    __typename?: 'DealStatus';
    status: Scalars['String'];
    step: Scalars['String'];
    pastSteps?: Maybe<Array<Maybe<Scalars['String']>>>;
    frozen: Scalars['Boolean'];
    reason?: Maybe<Scalars['String']>;
    errorDetail?: Maybe<Scalars['String']>;
    interestedInTrade: Scalars['Boolean'];
    canBeCancelled: Scalars['Boolean'];
    plateWillBeTransferred: Scalars['Boolean'];
    backendProdcutsStepDone: Scalars['Boolean'];
    docUploadStepDone: Scalars['Boolean'];
};
export declare type ServiceSalesTax = {
    __typename?: 'ServiceSalesTax';
    code: Scalars['String'];
    amount: Scalars['String'];
    description: Scalars['String'];
    feeType: Scalars['String'];
};
export declare enum DeviceType {
    Email = "EMAIL",
    Fcm = "FCM",
    Apns = "APNS"
}
export declare type CreateSubscriptionResult = SubjectSubscription | DuplicateSubscriptionError | ValidationError;
export declare type Phone = {
    __typename?: 'Phone';
    type: Scalars['String'];
    number: Scalars['String'];
};
export declare type Appraisal = {
    __typename?: 'Appraisal';
    vehicle: Vehicle;
    dsUUID?: Maybe<Scalars['String']>;
    zipcode?: Maybe<Scalars['String']>;
    options?: Maybe<Array<Scalars['String']>>;
    conditionData?: Maybe<ConditionData>;
    exteriorColor?: Maybe<Scalars['String']>;
    otherAfterMarket?: Maybe<Scalars['String']>;
    sfid: Scalars['String'];
    price?: Maybe<Scalars['Float']>;
    source: Scalars['String'];
    offerStatus: Scalars['String'];
    created: Scalars['Time'];
    xkeAppraisalId: Scalars['Int'];
    sellTiming?: Maybe<Scalars['String']>;
    expectedOffer?: Maybe<Scalars['Int']>;
    appraisaloffer?: Maybe<Array<Maybe<AppraisalOffer>>>;
};
export declare type DealResult = Deal | ApiError;
export declare type Financing = {
    __typename?: 'Financing';
    state: Scalars['String'];
    loanApplicationId: Scalars['String'];
    referenceId: Scalars['String'];
    decisions?: Maybe<Array<LoanDecision>>;
    pricingStack?: Maybe<LoanPricingStack>;
};
export declare type VehicleInventory = {
    __typename?: 'VehicleInventory';
    vin: Scalars['String'];
    year: Scalars['Int'];
    make: Scalars['String'];
    model: Scalars['String'];
    trim: Scalars['String'];
    fuelType?: Maybe<KeyDisplayPair>;
    seatingCapacity: Scalars['Int'];
    grossWeight: Scalars['Int'];
    isElectric: Scalars['Boolean'];
    cylinders: Scalars['Int'];
    engineBore: Scalars['Float'];
};
export declare type Fee = {
    __typename?: 'Fee';
    amount: Scalars['String'];
    code: Scalars['String'];
    description: Scalars['String'];
};
export declare type ValidationError = {
    __typename?: 'ValidationError';
    type: Scalars['String'];
    title: Scalars['String'];
    details?: Maybe<Array<ErrorDetail>>;
};
export declare type ShippingAddress = {
    __typename?: 'ShippingAddress';
    street1: Scalars['String'];
    street2: Scalars['String'];
    city: Scalars['String'];
    state: Scalars['String'];
    zipcode: Scalars['String'];
};
export declare type Trims = {
    __typename?: 'Trims';
    Uid?: Maybe<Scalars['Int']>;
    description: Scalars['String'];
    long_description: Scalars['String'];
    doors: Scalars['Int'];
    source: Scalars['String'];
};
export declare type TrimData = {
    __typename?: 'TrimData';
    source: Scalars['String'];
    database?: Maybe<Scalars['String']>;
    trims?: Maybe<Array<Maybe<Trims>>>;
};
export declare type LpToVin = {
    __typename?: 'LPToVIN';
    vehicles?: Maybe<Array<Maybe<Vehicles>>>;
};
export declare type Inventory = {
    __typename?: 'Inventory';
    id: Scalars['String'];
    miles?: Maybe<Scalars['Int']>;
    ownerCount?: Maybe<Scalars['Int']>;
    leadPhotoURL?: Maybe<Scalars['String']>;
    pricing?: Maybe<Pricing>;
    vehicle?: Maybe<VehicleInventory>;
    imageURLs?: Maybe<Array<ImageUrl>>;
    status?: Maybe<KeyDisplayPair>;
};
export declare type AmountDueTradeIn = {
    __typename?: 'AmountDueTradeIn';
    value: Scalars['Float'];
    loanPayoff: Scalars['Float'];
    netBalance: Scalars['Float'];
    totalDownPayment: Scalars['Float'];
};
export declare type InvSearchVehicleData = {
    __typename?: 'InvSearchVehicleData';
    vin: Scalars['String'];
    inventoryId: Scalars['Int'];
    bodyType: Scalars['String'];
    listingPrice: Scalars['Int'];
    color: Scalars['String'];
    year: Scalars['Int'];
    miles: Scalars['Int'];
    trim: Scalars['String'];
    model: Scalars['String'];
    make: Scalars['String'];
    vehicleType: Scalars['String'];
    soldStatus: Scalars['Int'];
    warrantyRemaining: Scalars['String'];
    warranty: Scalars['Int'];
    cylinders: Scalars['Int'];
    style: Scalars['String'];
    diesel: Scalars['Int'];
    leadFlagPhotoUrl: Scalars['String'];
    subjectLine: Scalars['String'];
    interiorPhotoUrlHiRes: Scalars['String'];
    hiresPhotos?: Maybe<Array<Scalars['String']>>;
    extColor: Scalars['String'];
    driveType: Scalars['String'];
    fuelType: Scalars['String'];
    transmission: Scalars['String'];
    doorCount: Scalars['Int'];
    intColor: Scalars['String'];
    optionalFeatures: Scalars['String'];
    engine: Scalars['String'];
    leadPhotoUrl: Scalars['String'];
    cityMpg: Scalars['Int'];
    highwayMpg: Scalars['Int'];
    combinedMpg: Scalars['Int'];
    frontTrackWidth: Scalars['Float'];
    rearTrackWidth: Scalars['Float'];
    wheelBase: Scalars['Float'];
    width: Scalars['Float'];
    length: Scalars['Float'];
    groundClearance: Scalars['Float'];
    height: Scalars['Float'];
    stockLeadFlagPhotoUrl: Scalars['String'];
    defectPhotos?: Maybe<Array<DefectPhotos>>;
    zoneID: Scalars['Int'];
    zone: Scalars['String'];
    hasStockPhotos: Scalars['Boolean'];
    partnerId: Scalars['String'];
    geoLocation: Scalars['String'];
    location: Scalars['String'];
    ownerCount: Scalars['Int'];
    isTitleQAPass: Scalars['Boolean'];
    isAvailableToSell: Scalars['Boolean'];
};
export declare type InvSearchCounterMakeModelData = {
    __typename?: 'InvSearchCounterMakeModelData';
    make: Scalars['String'];
    count: Scalars['Int'];
    models: Array<InvSearchCounterData>;
};
export declare type LoanPricingStack = {
    __typename?: 'LoanPricingStack';
    lenderName: Scalars['String'];
    apr: Scalars['Float'];
    amountFinanced: Scalars['Float'];
    buyRate: Scalars['Float'];
    financeCharge: Scalars['Float'];
    termMonths: Scalars['Int'];
    downPayment: Scalars['Int'];
    monthlyPayment: Scalars['Float'];
    totalRebates: Scalars['Int'];
    totalTaxes: Scalars['Float'];
    annualMileage: Scalars['Int'];
    offerAvailable: Scalars['Boolean'];
    taxItems?: Maybe<Array<TaxItem>>;
};
export declare type DepositPayment = {
    __typename?: 'DepositPayment';
    NameOnCard: Scalars['String'];
    LastFourDigits: Scalars['Int'];
    HoldID: Scalars['String'];
    StripeAuthChargeID: Scalars['String'];
    HoldPlaced: Scalars['Boolean'];
    DepositCaptured: Scalars['Boolean'];
    ChargeAmount: Scalars['Int'];
};
export declare type TaxesAndFees = {
    __typename?: 'TaxesAndFees';
    status: Scalars['String'];
    dmvFees?: Maybe<Array<Fee>>;
    dmvTotal: Scalars['String'];
    saleTax?: Maybe<Array<ServiceSalesTax>>;
};
export declare type DocumentMetadata = {
    __typename?: 'DocumentMetadata';
    fileType: Scalars['String'];
    fileID: Scalars['String'];
};
export declare enum ErrorType {
    BadRequest = "BadRequest",
    ServerFailure = "ServerFailure",
    DealOutOfSync = "DealOutOfSync"
}
export declare enum AddressType {
    Registration = "REGISTRATION",
    Delivery = "DELIVERY",
    Billing = "BILLING"
}
export declare type ImageUrl = {
    __typename?: 'ImageURL';
    thumbnail: Scalars['String'];
    image: Scalars['String'];
};
export declare type Address = {
    __typename?: 'Address';
    id: Scalars['ID'];
    type: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    streetLine1: Scalars['String'];
    streetLine2: Scalars['String'];
    city: Scalars['String'];
    state: Scalars['String'];
    country: Scalars['String'];
    postcode: Scalars['String'];
};
export declare type DeleteDeal = {
    __typename?: 'DeleteDeal';
    result: Scalars['Boolean'];
};
export declare type Deal = {
    __typename?: 'Deal';
    dealID: Scalars['Int'];
    accountID: Scalars['Int'];
    versionNumber: Scalars['Int'];
    createdAt: Scalars['Time'];
    updatedAt: Scalars['Time'];
    dealSummary: DealSummary;
};
export declare type AmountDue = {
    __typename?: 'AmountDue';
    taxableAmount: Scalars['Float'];
    cashDownPayment: Scalars['Float'];
    inventoryTaxRate: Scalars['Float'];
    inventoryTaxFee: Scalars['Float'];
    salesTaxPercentage: Scalars['Float'];
    salesTaxAmount: Scalars['Float'];
    otherStateTaxes: Scalars['Float'];
    totalTaxes: Scalars['Float'];
    titleFee: Scalars['Float'];
    duplicateTitleFee: Scalars['Float'];
    titlingCompanyFee: Scalars['Float'];
    licenseAndRegistrationFee: Scalars['Float'];
    inspectionFee: Scalars['Float'];
    totalStateFees: Scalars['Float'];
    documentationFee: Scalars['Float'];
    totalTaxesAndFees: Scalars['Float'];
    shippingFee: Scalars['Float'];
    subTotal: Scalars['Float'];
    totalBalanceDue: Scalars['Float'];
    tradeIn?: Maybe<AmountDueTradeIn>;
};
export declare type Device = {
    __typename?: 'Device';
    id: Scalars['String'];
    type: DeviceType;
};
export declare type InvSearchCounterData = {
    __typename?: 'InvSearchCounterData';
    key: Scalars['String'];
    count: Scalars['Int'];
};
export declare type InvSearchCounters = {
    __typename?: 'InvSearchCounters';
    makesModels?: Maybe<Array<InvSearchCounterMakeModelData>>;
    trans?: Maybe<Array<InvSearchCounterData>>;
    driveTrain?: Maybe<Array<InvSearchCounterData>>;
    bodyType?: Maybe<Array<InvSearchCounterData>>;
};
export declare type Query = {
    __typename?: 'Query';
    version: Scalars['Int'];
    offerByEmail?: Maybe<Array<AppraisalOffer>>;
    dealById?: Maybe<Deal>;
    hornListSubscriptions?: Maybe<SubscriptionPage>;
    hornCheckSubscriptionExists: CheckSubscriptionResult;
    invSearch?: Maybe<InvSearchResult>;
    shipping: ShippingResult;
    user?: Maybe<User>;
    decodeVIN: VinData;
    licensePlateToVin: LpToVin;
};
export declare type QueryOfferByEmailArgs = {
    email: Scalars['String'];
};
export declare type QueryDealByIdArgs = {
    dealId: Scalars['Int'];
};
export declare type QueryHornCheckSubscriptionExistsArgs = {
    subject: Scalars['String'];
    filters: Scalars['String'];
};
export declare type QueryInvSearchArgs = {
    offset?: Maybe<Scalars['Int']>;
    limit?: Maybe<Scalars['Int']>;
    sortBy?: Maybe<Scalars['String']>;
    sortDirection?: Maybe<Scalars['String']>;
    testDriveOnly?: Maybe<Scalars['Boolean']>;
    source: Scalars['String'];
    searchAll?: Maybe<Scalars['String']>;
    transmissionID?: Maybe<Scalars['String']>;
    year_min?: Maybe<Scalars['Int']>;
    year_max?: Maybe<Scalars['Int']>;
    miles_min?: Maybe<Scalars['Int']>;
    miles_max?: Maybe<Scalars['Int']>;
    price_min?: Maybe<Scalars['Int']>;
    price_max?: Maybe<Scalars['Int']>;
    make?: Maybe<Array<Scalars['String']>>;
    makeSlug?: Maybe<Array<Scalars['String']>>;
    model?: Maybe<Array<Scalars['String']>>;
    modelSlug?: Maybe<Array<Scalars['String']>>;
    color?: Maybe<Array<Scalars['String']>>;
    driveType?: Maybe<Array<Scalars['String']>>;
    bodyType?: Maybe<Array<Scalars['String']>>;
    vin?: Maybe<Array<Scalars['String']>>;
    soldStatus?: Maybe<Scalars['String']>;
    trim?: Maybe<Array<Scalars['String']>>;
};
export declare type QueryShippingArgs = {
    username: Scalars['String'];
    password: Scalars['String'];
    carrierID?: Maybe<Scalars['String']>;
    carrierName?: Maybe<Scalars['String']>;
    status?: Maybe<Scalars['String']>;
};
export declare type QueryDecodeVinArgs = {
    vin: Scalars['String'];
    colors: Scalars['Boolean'];
    source?: Maybe<Scalars['String']>;
    options?: Maybe<Scalars['Boolean']>;
};
export declare type QueryLicensePlateToVinArgs = {
    lp: Scalars['String'];
    state: Scalars['String'];
    source: Scalars['String'];
};
export declare type User = {
    __typename?: 'User';
    username: Scalars['String'];
    firstName: Scalars['String'];
    middleName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    consents: Consents;
    deals?: Maybe<Array<Deal>>;
    files?: Maybe<Array<File>>;
    addresses?: Maybe<Array<Address>>;
    phones?: Maybe<Array<Phone>>;
    emails?: Maybe<Array<Email>>;
    favoriteVehicles?: Maybe<Array<FavoriteVehicles>>;
    appraisals?: Maybe<Array<Maybe<Appraisal>>>;
};
export declare type UserDealsArgs = {
    dealStatus?: Maybe<Array<Scalars['String']>>;
    dealID?: Maybe<Scalars['Int']>;
};
export declare type DealSummary = {
    __typename?: 'DealSummary';
    paymentType: Scalars['String'];
    dealStatus: DealStatus;
    accountInfo?: Maybe<Account>;
    depositPaymentInfo?: Maybe<DepositPayment>;
    inventory?: Maybe<Inventory>;
    searchedInventory?: Maybe<InvSearchVehicleData>;
    autoFiResponse?: Maybe<AutoFiResponse>;
    taxesAndFees?: Maybe<TaxesAndFees>;
    amountDue?: Maybe<AmountDue>;
    dateCompleted?: Maybe<Scalars['Time']>;
    registrationAddress?: Maybe<AddressDto>;
    deliveryAddress?: Maybe<AddressDto>;
    billingAddress?: Maybe<AddressDto>;
    deliveryDetails?: Maybe<DeliveryDetails>;
    documents?: Maybe<Array<DocumentMetadata>>;
    additionalProducts?: Maybe<Scalars['Map']>;
    financing?: Maybe<Financing>;
    credit?: Maybe<CreditApplication>;
};
export declare type CheckSubscriptionResult = Check | ValidationError;
export declare type Consents = {
    __typename?: 'Consents';
    emailMarketing: Scalars['String'];
    smsMarketing: Scalars['String'];
};
export declare type BasicData = {
    __typename?: 'BasicData';
    source: Scalars['String'];
    database?: Maybe<Scalars['String']>;
    year: Scalars['Int'];
    make: Scalars['String'];
    model: Scalars['String'];
};
