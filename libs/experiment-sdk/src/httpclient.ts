/* eslint-disable @typescript-eslint/camelcase */
import { default as axios } from 'axios';

import {
  Experiment,
  ExperimentStatusTuple,
  Impression,
  ImpressionDto,
} from './types';

export function mapExperimentDTO(dto: ExperimentDto): Experiment {
  return {
    ...dto,
    assignedVariant: 0,
    startTime: dto.startTime === null ? null : new Date(dto.startTime),
    variants: dto.variants.map((v, idx) => {
      return {
        ...v,
        isDefault: idx === 0,
        isWinner: dto.winningVariantId === idx,
      };
    }),
  };
}

export interface HttpClient {
  fetchExperiment(experimentId: string): Promise<Experiment | undefined>;
  logImpression(impression: Impression): Promise<void>;
  fetchExperimentMeta(): Promise<Experiment[]>;
}

export class HttpClientImpl implements HttpClient {
  private readonly experimentApiBase: string;
  private readonly impressionApiBase: string;

  constructor(experimentApiBase: string, impressionApiBase: string) {
    this.experimentApiBase = experimentApiBase;
    this.impressionApiBase = impressionApiBase;
  }

  async fetchExperiment(experimentId: string): Promise<Experiment | undefined> {
    const res = await axios.get<ExperimentDto>(
      `${this.experimentApiBase}/experiments/${experimentId}.json`,
      { timeout: 20_000 }
    );

    if (res.status !== 200) {
      return undefined;
    }

    return mapExperimentDTO(res.data);
  }

  async logImpression(impression: Impression): Promise<void> {
    const dto: ImpressionDto = {
      experiment_id: impression.experimentId,
      variant_id: impression.variantId,
      client_uuid: impression.marketingId,
      client_id: impression.userId,
      url:
        typeof window === 'undefined' ? undefined : window.location.toString(),
    };

    const res = await axios.post(`${this.impressionApiBase}/impressions/`, dto);
    if (res.status !== 200) {
      throw new Error(`Impression log returned non-200 response ${res.status}`);
    }
  }

  async fetchExperimentMeta(): Promise<Experiment[]> {
    const res = await axios.get<ExperimentMetaResponse>(
      `${this.experimentApiBase}/experiments_meta.json`,
      { timeout: 20_000 }
    );

    if (res.status !== 200) {
      throw new Error('Failed to retrieve experiment meta.');
    }

    return res.data.experiments.map((e) => mapExperimentDTO(e));
  }
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
