export interface Appraisal {
  vehicleInfoForm: {
    vin: string;
    exteriorColor: string;
    keysAmount: string;
    make: string;
    mileage: number;
    model: string;
    trim: string;
    vehicleOptions: string[];
    year: number;
  };

  vehicleHistoryForm: { hasAccident: string; titleStatus: string };

  personalInfoForm: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    zipCode: string;
  };

  mechConditionForm: {
    additionalDetails: string;
    floodFireDamage: string;
    mechanicalCondition: string;
    otherWarning: string;
    runnable: string;
    warningLights: string;
    warningLightsValues: string[];
  };

  intConditionForm: {
    interiorCondition: string;
    seats: string;
    smokedIn: string;
  };

  extConditionForm: {
    afterMarket: string[];
    dents: string;
    dentsPanels?: number;
    exteriorCondition: string;
    hailDamage: string;
    otherAfterMarket: string;
    paintChipping: string;
    paintChippingPanels?: number;
    rust: string;
    scratches: string;
    scratchesPanels: null;
    tiresAndWheels: string;
  };
}
