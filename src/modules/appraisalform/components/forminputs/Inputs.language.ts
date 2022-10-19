export const commonLangInput = {
  yes: 'Yes',
  no: 'No',
  other: 'Other',
  otherOptionsLabel: 'Options (select all that apply)',
  aboveAverage: 'Above Average',
  average: 'Average',
  belowAverage: 'Below Average',
};

export const FormFields = {
  first: {
    placeholder: 'First name',
    legalLabel: 'Legal first name',
    label: 'First name',
  },
  last: {
    placeholder: 'Last name',
    legalLabel: 'Legal last name',
    label: 'Last name',
  },
  email: {
    placeholder: 'example@example.com',
    label: 'Email address',
  },
  address: {
    placeholder: 'Address',
    label: 'Address',
  },
  apartment: {
    placeholder: 'Apt/Suite',
    label: 'Apartment / Suite number (optional)',
  },
  city: {
    placeholder: 'City',
    label: 'City',
  },
  state: {
    placeholder: 'State',
    label: 'State',
    type: 'state',
  },
  stateOfPurchase: {
    label: 'In which state did you purchase your vehicle?',
    placeholder: 'State of purchase',
    type: 'tradeInState',
  },
  zip: {
    placeholder: 'Zip code',
    label: 'Zip Code',
  },
  phoneNumber: {
    placeholder: '(  ) ___-____',
    label: 'Phone number',
  },
  optionalPhoneNumber: {
    placeholder: '(  ) ___-____',
    label: 'Phone number (optional)',
  },
  fullName: {
    placeholder: 'First and last name',
    label: 'Name on card',
  },
  cardNumber: {
    placeholder: 'XXXX XXXX XXXX XXXX',
    label: 'Credit card number',
  },
  expDate: {
    placeholder: 'MM/YY',
    label: 'Expiration date',
  },
  securityCode: {
    placeholder: 'XXX',
    label: 'Security code',
  },
  discoverSecurityCode: {
    placeholder: 'XXXX',
    label: 'Security code',
  },
  monthlyPayment: {
    placeholder: 'Monthly Payment',
    label: 'Monthly payment',
  },
  years: {
    placeholder: 'Years',
    label: 'Years',
  },
  months: {
    placeholder: 'Months',
    label: 'Months',
  },
  downPayment: {
    placeholder: 'Down Payment',
    label: 'Preferred Down Payment',
  },
  employerName: {
    placeholder: 'Name of employer',
    label: 'Name of employer',
  },
  title: {
    placeholder: 'Your job title',
    label: 'Job title',
    coPlaceholder: 'Co-applicant Title',
    coLabel: 'Co-applicant Title',
  },
  employerPhoneInput: {
    placeholder: '(xxx) xxx-xxxx',
    label: 'Employer phone number',
  },
  employmentStatus: {
    placeholder: 'Employment status',
    label: 'Employment status',
    type: 'prevEmployementStatus',
  },
  grossAnnualIncome: {
    placeholder: 'Gross annual income',
    label: 'Gross annual income',
  },
  secondarySourceOfIncome: {
    placeholder: 'Source of income',
    label: 'Source of income',
  },
  dob: {
    placeholder: 'MM/DD/YYYY',
    label: 'Date of birth',
  },
  ssn: {
    placeholder: '___-__-___',
    label: 'Social Security Number / ITIN',
  },
  license: {
    placeholder: 'License plate',
    label: 'License plate',
  },
  vin: {
    placeholder: 'VIN Number',
    label: 'Vehicle Identification Number (VIN)',
  },
  trim: {
    placeholder: 'Trim',
    label: 'Trim',
  },
  exactMileage: {
    placeholder: 'Exact Mileage',
    label: 'Exact Mileage',
    toolTip:
      'Enter the exact mileage (as displayed on your odometer) to get a guaranteed price on your vehicle. Without the exact mileage, we may rescind or change the price.',
  },
  extColor: {
    placeholder: 'Exterior Color',
    label: 'Exterior Color (outside of the car)',
  },
  vehicleOptions: {
    label: commonLangInput.otherOptionsLabel,
  },
  lookingToAccomplish: {
    label: 'Which are you most interested in?',
    name: 'lookingAccomplish',
    sellMyVehicle: {
      label: 'Selling my car',
    },
    tradeIn: {
      label: 'Trading in my car',
    },
    notSure: {
      label: 'Not sure',
    },
  },
  loanLength: {
    placeholder: '',
    label: 'What is your preferred loan length? (months)',
  },
  runnable: {
    placeholder: '',
    label: 'Does your vehicle run and drive?',
    yes: commonLangInput.yes,
    no: commonLangInput.no,
  },
  warningLights: {
    placeholder: '',
    label: 'Are there any active warning lights?',
    newLabel: 'Warning lights',
    yes: commonLangInput.yes,
    no: commonLangInput.no,
  },
  warningLightOptions: {
    label: commonLangInput.otherOptionsLabel,
    abs: 'ABS/Anti-Lock Brakes',
    airbag: 'Air Bag',
    checkEngine: 'Check Engine',
    transmission: 'Transmission',
    airConditioner: 'Air Conditioner',
    fluid: 'Fluid',
    serviceEngine: 'Service Engine',
    lowCoolant: 'Low Coolant',
    other: commonLangInput.other,
  },
  floodFireDamage: {
    placeholder: '',
    label: 'Any water or fire damage?',
    yes: commonLangInput.yes,
    no: commonLangInput.no,
  },
  mechanicalCondition: {
    placeholder: '',
    label: 'Mechanical Condition',
    name: 'MechanicalCondition',
    aboveAverage: {
      label: commonLangInput.aboveAverage,
      description:
        'Mechanically excellent. Able to pass an emissions test. Any minor issues have been corrected.',
    },
    average: {
      label: commonLangInput.average,
      description:
        'Mechanically sound. Able to pass an emissions test. Any minor issues have been corrected.',
    },
    belowAverage: {
      label: commonLangInput.belowAverage,
      description:
        'Mechanically deficient. May be unable to pass an emissions test.  Issues or defects that will require correction.',
    },
  },
  additionalDetails: {
    placeholder: '',
    label:
      'Is there anything else we should know about this vehicle that might affect its value?',
  },
  howManyKeys: {
    placeholder: '',
    label: 'How many keys do you have for this vehicle?',
  },
  otherOption: {
    placeholder: 'Please Explain',
    label: '',
  },
  extCondition: {
    placeholder: '',
    label: 'Exterior Condition',
    name: 'ExteriorCondition',
    aboveAverage: {
      label: commonLangInput.aboveAverage,
      description:
        'Excellent or like-new condition. Little or no wear and tear. Vehicle has never been repainted.',
    },
    average: {
      label: commonLangInput.average,
      description:
        'Average condition. Normal wear and tear including small dents, dings, and scratches. No accidents of any kind. Vehicle has never been repainted.',
    },
    belowAverage: {
      label: commonLangInput.belowAverage,
      description:
        'Clear cosmetic defects that require correction including large scratches or dents or visible signs of rust. Vehicle may have been repainted.',
    },
  },
  rust: {
    placeholder: '',
    label: 'Does your vehicle have any signs of rust?',
    newLabel: 'Rust',
    yes: commonLangInput.yes,
    no: commonLangInput.no,
  },
  dents: {
    placeholder: '',
    label: 'Does your vehicle have any dents?',
    newLabel: 'Dents',
    yes: commonLangInput.yes,
    no: commonLangInput.no,
  },
  dentsPanels: {
    placeholder: '',
    label: 'How many panels have dents?',
  },
  hailDamage: {
    placeholder: '',
    label: 'Does your car have hail damage?',
    newLabel: 'Hail damage',
    yes: commonLangInput.yes,
    no: commonLangInput.no,
  },
  paintChipping: {
    placeholder: '',
    label: 'Does your vehicle have any paint chipping?',
    newLabel: 'Paint Damage/Imperfections',
    yes: commonLangInput.yes,
    no: commonLangInput.no,
  },
  paintChippingPanels: {
    placeholder: '',
    label: 'How many panels have paint chipping?',
  },
  scratches: {
    placeholder: '',
    label: 'Does your vehicle have any scratches?',
    newLabel: 'Scratches',
    yes: commonLangInput.yes,
    no: commonLangInput.no,
  },
  scratchesPanels: {
    placeholder: '',
    label: 'How many panels have scratches?',
  },
  tireMiles: {
    placeholder: '',
    label: 'How many miles have you driven on your current tires?',
    toolTip: `If you're not sure, assume you've driven 12,000 miles per year.`,
    name: 'TireMiles',
    underFive: {
      label: 'Under 5K',
    },
    fiveToTen: {
      label: '5 to 10K',
    },
    tenToTwenty: {
      label: '10 to 20K',
    },
    twentyToThirty: {
      label: '20 to 30K',
    },
    overThirty: {
      label: 'Over 30K',
    },
  },
  afterMarket: {
    placeholder:
      'Does your vehicle have any custom alterations or modifications? (select all that apply)',
    label: 'Aftermarket Modifications',
    stereo: 'Stereo System',
    wheels: 'Wheels and tires',
    exhaust: 'Exhaust',
    suspension: 'Suspension',
    performance: 'Performance',
    other: commonLangInput.other,
  },
  alternateAfterMarket: {
    placeholder:
      'Does your vehicle have any custom alterations or modifications? (select all that apply)',
    label: 'Aftermarket Modifications',
    stereo: 'Stereo System',
    wheels: 'Wheels and tires',
    exhaust: 'Exhaust',
    suspension: 'Suspension',
    performance: 'Performance',
    other: commonLangInput.other,
    toolTip:
      'Aftermarket modifications are any replacement parts or modifications made by someone other than the original part manufacturer.',
  },
  otherAfterMarket: {
    placeholder: 'Please Explain',
    label: '',
  },
  hasAccident: {
    label: 'Has your vehicle been in an accident?',
    yes: commonLangInput.yes,
    no: commonLangInput.no,
  },
  titleStatus: {
    label: 'What type of title does the vehicle have?',
    name: 'TitleStatus',
    clean: {
      label: 'Clean',
      description:
        'No history of salvage or automaker defects listed on the title,  may or may not have money borrowed on the vehicle.',
    },
    lemon: {
      label: 'Lemon',
      description:
        'The vehicle has been previously acquired by the manufacturer  due to a warranty defect that impaired use or safety.',
    },
    salvage: {
      label: 'Rebuilt Salvage',
      description:
        'Vehicle is a salvage vehicle but has now been repaired and restored to operation.',
    },
    unknown: {
      label: 'True Miles Unknown',
      description: 'Vehicle has an odometer reading that is inaccurate.',
    },
    toolTip: `Title brands indicate whether a used vehicle has sustained damage or might be potentially unsafe to drive. If a vehicle's title has been "branded," it is an official designation made by a state agency and should appear on the vehicle's title paperwork.`,
  },
  lienholder: {
    label: 'Do you currently have a loan or lease on your vehicle?',
    loan: 'Loan',
    lease: 'Lease',
    neither: 'Neither',
  },
  interiorCondition: {
    label: 'Interior Condition',
    name: 'InteriorCondition',
    aboveAverage: {
      label: commonLangInput.aboveAverage,
      description:
        'Excellent or like-new condition. Little or no wear and tear. No stains.',
    },
    average: {
      label: commonLangInput.average,
      description:
        'Average condition. No damage to seats or carpets. Minimal wear and tear. Minor stains.',
    },
    belowAverage: {
      label: commonLangInput.belowAverage,
      description:
        'Clear signs of use. Excessive wear and tear. Multiple burns, defects, or stains.',
    },
  },
  seats: {
    label: 'Seats',
    leather: 'Leather',
    cloth: 'Cloth',
  },
  smokedIn: {
    label: 'Has your vehicle been smoked in?',
    yes: commonLangInput.yes,
    no: commonLangInput.no,
  },
  primaryOwner: {
    label: 'Are you the owner of this vehicle?',
  },
  secondaryOwner: {
    label: 'Is there a second owner of this vehicle?',
  },
  poc: {
    label: '',
  },
  primaryPickup: {
    label: '',
  },
  bankName: {
    placeholder: 'Select a lien financial institution',
    label: 'Name of Lien Financial Institution',
  },
  bankPhoneNumber: {
    placeholder: '(xxx) - xxx - xxxx',
    label: 'Financial Institution Phone Number (optional)',
  },
  loanAccountNumber: {
    placeholder: 'xxxxxxxxxxxx',
    label: 'Lien Account Number',
  },
  lastFourSSN: {
    placeholder: '____',
    label: 'Last Four Digits of Social Security Number (optional)',
  },
  termsCheckbox: {
    label:
      'I authorize Vroom to inquire and request any necessary information from my lienholder',
  },
  lienFinancialInstitutionName: {
    label: 'Lienholder Name',
  },
  subject: {
    placeholder: 'What are you contacting us about?',
    label: 'Subject',
  },
  message: {
    placeholder: 'Write your message here',
    label: 'Message',
  },
  reasonToVisit: {
    placeholder: 'Choose a reason for visit',
    label: 'Reason for visit',
  },
  aboutUs: {
    placeholder: 'Choose an option',
    label: `How'd you hear about us?`,
  },
  remainingLoanBalance: {
    placeholder: 'Remaining loan balance',
    label: 'Remaining loan balance*',
  },
  tradeInState: {
    label: 'In which state did you purchase your vehicle?',
    placeholder: 'State of purchase',
    subLabel: 'State',
    type: 'tradeInState',
  },
};
