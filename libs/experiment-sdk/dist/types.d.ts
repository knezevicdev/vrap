export declare type VariantEnum = 0 | 1;
export declare enum ExperimentStatus {
    Pending = "pending",
    Running = "running",
    Canceled = "canceled",
    Completed = "completed"
}
export declare type ExperimentStatusTuple = {
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
    client_uuid: string;
    client_id?: string;
    url?: string;
}
export interface ExperimentMeta {
    id: string;
    optimizeId?: string;
    status: string;
    lastUpdated: Date;
    applicationName?: string;
}
