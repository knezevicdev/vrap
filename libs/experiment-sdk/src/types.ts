export type VariantEnum = 0 | 1;

export enum ExperimentStatus {
  Pending = 'pending',
  Running = 'running',
  Canceled = 'canceled',
  Completed = 'completed',
}

export type ExperimentStatusTuple = {
  key: ExperimentStatus;
  display: string;
};

export interface UnassignedExperiment {
  id: string;
  optimizeId?: string;
  name: string;
  status: ExperimentStatusTuple;
  hypothesis: string;
  result: string | null;
  startTime: Date | null;
  team: string;
  variants: Variant[];
  application?: string;
}

export interface Experiment extends UnassignedExperiment {
  assignedVariant: VariantEnum;
}

export interface Variant {
  name: string;
  weight: number;
  isWinner: boolean;
  isDefault: boolean;
}

export interface Impression {
  experimentId: string;
  variantId: string;
  userId?: string;
  marketingId: string;
}

export interface ImpressionDto {
  experiment_id: string;
  variant_id: string;
  // Marketing id
  client_uuid: string;
  // The user id
  client_id?: string;
  // The origin page eg. https://www.vroom.com/catalog (window.location)
  url?: string;
}

export interface ExperimentMeta {
  id: string;
  optimizeId?: string;
  status: string;
  lastUpdated: Date;
  applicationName?: string;
}
