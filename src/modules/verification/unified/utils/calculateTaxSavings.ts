const taxRates: Record<
  string,
  {
    rate: number;
    disallowTaxSavings?: boolean;
    taxCap?: number;
  }
> = {
  AL: {
    rate: 0.04,
  },
  AK: {
    rate: 0,
    disallowTaxSavings: true,
  },
  AR: {
    rate: 0.065,
  },
  AZ: {
    rate: 0.056,
  },
  CA: {
    rate: 0.0725,
    disallowTaxSavings: true,
  },
  CO: {
    rate: 0.029,
  },
  CT: {
    rate: 0.0635,
  },
  DC: {
    rate: 0.06,
    disallowTaxSavings: true,
  },
  DE: {
    rate: 0,
  },
  FL: {
    rate: 0.06,
  },
  GA: {
    rate: 0.04,
  },
  HI: {
    rate: 0.04,
    disallowTaxSavings: true,
  },
  IA: {
    rate: 0.06,
  },
  ID: {
    rate: 0.06,
  },
  IL: {
    rate: 0.0625,
    taxCap: 10000,
  },
  IN: {
    rate: 0.07,
  },
  KS: {
    rate: 0.065,
  },
  KY: {
    rate: 0.06,
  },
  LA: {
    rate: 0.0445,
  },
  MA: {
    rate: 0.0625,
  },
  MD: {
    rate: 0.06,
  },
  ME: {
    rate: 0.055,
  },
  MI: {
    rate: 0.06,
    taxCap: 7000,
  },
  MN: {
    rate: 0.0688,
  },
  MO: {
    rate: 0.0423,
  },
  MS: {
    rate: 0.07,
  },
  MT: {
    rate: 0,
    disallowTaxSavings: true,
  },
  NC: {
    rate: 0.0475,
  },
  ND: {
    rate: 0.05,
  },
  NE: {
    rate: 0.055,
  },
  NH: {
    rate: 0,
    disallowTaxSavings: true,
  },
  NJ: {
    rate: 0.0663,
  },
  NM: {
    rate: 0.0513,
  },
  NV: {
    rate: 0.0685,
  },
  NY: {
    rate: 0.04,
  },
  OH: {
    rate: 0.0575,
    disallowTaxSavings: true,
  },
  OK: {
    rate: 0.045,
    disallowTaxSavings: true,
  },
  OR: {
    rate: 0,
  },
  PA: {
    rate: 0.06,
  },
  RI: {
    rate: 0.07,
  },
  SC: {
    rate: 0.06,
  },
  SD: {
    rate: 0.045,
  },
  TN: {
    rate: 0.07,
  },
  TX: {
    rate: 0.0625,
  },
  UT: {
    rate: 0.061,
  },
  VA: {
    rate: 0.053,
  },
  VT: {
    rate: 0.06,
    disallowTaxSavings: true,
  },
  WA: {
    rate: 0.065,
  },
  WI: {
    rate: 0.05,
  },
  WV: {
    rate: 0.06,
  },
  WY: {
    rate: 0.04,
  },
};

const calculateTaxSavings = (state: string, price: number): number => {
  if (!taxRates[state]) return 0;

  const { rate, taxCap, disallowTaxSavings } = taxRates[state];

  if (disallowTaxSavings) return 0;
  if (taxCap) return Math.min(price, taxCap) * rate;

  return price * rate;
};

export default calculateTaxSavings;
