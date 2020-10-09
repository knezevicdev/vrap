import { Experiment, ExperimentStatusTuple, Impression } from './types';
export declare function mapExperimentDTO(dto: ExperimentDto): Experiment;
export interface HttpClient {
    fetchExperiment(experimentId: string): Promise<Experiment | undefined>;
    logImpression(impression: Impression): Promise<void>;
    fetchExperimentMeta(): Promise<Experiment[]>;
}
export declare class HttpClientImpl implements HttpClient {
    private readonly experimentApiBase;
    private readonly impressionApiBase;
    constructor(experimentApiBase: string, impressionApiBase: string);
    fetchExperiment(experimentId: string): Promise<Experiment | undefined>;
    logImpression(impression: Impression): Promise<void>;
    fetchExperimentMeta(): Promise<Experiment[]>;
}
export interface ExperimentDto {
    id: string;
    optimizeId: string;
    name: string;
    status: ExperimentStatusTuple;
    hypothesis: string;
    result: string | null;
    startTime: string | null;
    team: string;
    winningVariantId: number | null;
    variants: VariantDto[];
    application?: string;
}
export interface VariantDto {
    name: string;
    weight: number;
}
export interface ExperimentMetaResponse {
    experiments: ExperimentDto[];
}
