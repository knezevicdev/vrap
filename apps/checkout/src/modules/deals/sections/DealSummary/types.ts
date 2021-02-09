export interface DealSummaryProps {
  vehicle: VehicleProps;
  deal: DealProps;
  trades?: DealTradeProps;
}

export interface VehicleProps {
  vehicle: Vehicle;
  listingPrice: number;
  trim: string;
  miles?: number | null;
  leadPhotoURL?: string | null;
}

export interface DealProps {
  method: string;
  taxes: number;
  additionalProducts?: FniProducts;
  financing?: FinancingProps | null;
  shippingFee?: number;
  subtotal: number;
  depositCaptured: boolean;
}

export interface DealTradeProps {
  vehicle: Vehicle;
  credit: number;
  loanBalance?: number | null;
}

export interface FniProducts {
  vehicleServiceProtection?: CostSummary;
  gapCoverage?: CostSummary;
  tireAndWheelCoverage?: CostSummary;
}
export interface FinancingProps {
  downPayment: number;
  bank: string;
  apr: number;
  financeTerm: number;
  numberOfPayments: number;
  amountFinanced: number;
  financeCharge: number;
  monthlyPayment: number;
}

interface CostSummary {
  cost: number;
  summary: string;
}

interface Vehicle {
  year: number;
  make: string;
  model: string;
}
