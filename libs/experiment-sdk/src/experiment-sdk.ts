import { CatSDK } from '@vroom-web/cat-sdk';
import * as murmur from 'murmurhash-js';
import NodeCache from 'node-cache';

import { HttpClient, HttpClientImpl } from './httpclient';
import { Experiment, ExperimentStatus, VariantEnum } from './types';

/**
 * ClientOptions is the optional constructor parameters for Client.
 */
export interface ClientOptions {
  experimentApiBase?: string;
  impressionApiBase?: string;
  httpClient?: HttpClient;
  // The cache expiration duration.
  cacheExpiration?: number;
}

/**
 * ExperimentOptions contains options to modify the behavior of the
 * experiment related methods.
 */
export interface ExperimentOptions {
  variantOverrides?: { [key: string]: VariantEnum };
}

export function assignVariant(
  marketingId: string,
  experiment: Experiment
): void {
  experiment.assignedVariant = 0;

  switch (experiment.status.key) {
    case ExperimentStatus.Completed:
      // eslint-disable-next-line no-case-declarations
      const winner = experiment.variants.findIndex((v) => v.isWinner);
      if (winner >= 0) {
        experiment.assignedVariant = winner as VariantEnum;
      }
      break;
    case ExperimentStatus.Running:
      // eslint-disable-next-line no-case-declarations
      const hash: number = murmur.murmur2(`${experiment.id}:${marketingId}`, 0);
      experiment.assignedVariant = (hash % 2) as VariantEnum;
      break;
  }
}

/**
 * Client is the main sdk for the a/b testing framework.
 * There should only be one client active in an application at a given time.
 */
export class ExperimentSDK {
  private readonly httpClient: HttpClient;
  private readonly cache = new NodeCache();
  private readonly cacheExpiration: number;
  private readonly catSDK = new CatSDK();

  /**
   * @param options are the client options. It is not necessary to update these
   * unless you are debugging or testing the sdk.
   */
  constructor(options?: ClientOptions) {
    const expApiBase =
      (options && options.experimentApiBase) ||
      'https://experiments-prod.p.vroom.systems';
    const impApiBase =
      (options && options.impressionApiBase) ||
      'https://experiments-prod.p.vroom.systems';
    this.httpClient =
      (options && options.httpClient) ||
      new HttpClientImpl(expApiBase, impApiBase);
    this.cacheExpiration = (options && options.cacheExpiration) || 60;
  }

  /**
   * getAndLogExperiment gets the experiment active variant and logs it to the backend.
   *
   * This method should always be used over getAssignedVariant unless there
   * is a specific reason that the impressions cannot be logged.
   *
   * @param experimentId experimentId is the vroom experiment id.
   * @param marketingId is a unique identifier for a user's session.
   * @param userId is a logged in user's id.
   * @param userId is a logged in user's id.
   * @param options are options to modify the getExperiment's behavior
   */
  public async getAndLogExperiment(
    experimentId: string,
    marketingId: string,
    userId?: string,
    options?: ExperimentOptions
  ): Promise<Experiment | undefined> {
    const experiment = await this.getExperiment(
      experimentId,
      marketingId,
      userId,
      options
    );
    if (experiment === undefined) return undefined;

    this.logImpression(experiment, marketingId, userId);

    return experiment;
  }

  /**
   * getExperiments gets the experiment & active variant for a given experiment id.
   *
   * @param experimentId is the vroom experiment id.
   * @param marketingId is a unique identifier for a user's session.
   * @param userId is a logged in user's id.
   * @param options are options to modify the getExperiment's behavior
   * @return returns the variant id (number)
   */
  public async getExperiment(
    experimentId: string,
    marketingId: string,
    _userId?: string,
    options?: ExperimentOptions
  ): Promise<Experiment | undefined> {
    let experiment: Experiment | undefined;

    experiment = this.cache.get<Experiment>(experimentId);
    if (experiment === undefined) {
      try {
        experiment = await this.httpClient.fetchExperiment(experimentId);
      } catch (e) {
        console.error(`Failed to get experiment ${e}`);
      }
      this.cache.set(experimentId, experiment, this.cacheExpiration);
    }

    // If we fail to get the experiment, return default
    if (experiment === undefined) {
      return undefined;
    }

    const overrides =
      options && options.variantOverrides ? options.variantOverrides : {};
    const override = overrides[experiment.id];
    if (override !== undefined) {
      experiment.assignedVariant = override;
      return experiment;
    }

    assignVariant(marketingId, experiment);

    return experiment;
  }

  /**
   * logImpression logs the impression to the analytics backend.
   *
   * @param experiment is the experiment returned from getExperiment
   * @param marketingId is a unique identifier for a user's session.
   * @param userId is a logged in user's id.
   */
  public async logImpression(
    experiment: Experiment,
    marketingId: string,
    userId?: string
  ): Promise<void> {
    await this.httpClient.logImpression({
      experimentId: experiment.id,
      variantId: experiment.assignedVariant.toString(),
      marketingId,
      userId,
    });
  }

  /**
   * getExperimentsBulk concurrently fetches a list of experiments
   *
   * @param experimentIds is a list of vroom experiment ids.
   * @param marketingId is a unique identifier for a user's session.
   * @param userId is a logged in user's id.
   * @param options are options to modify the getExperiment's behavior
   */
  public async getExperimentsBulk(
    experimentIds: string[],
    marketingId: string,
    userId?: string,
    options?: ExperimentOptions
  ): Promise<Map<string, Experiment | undefined>> {
    const experiments = await Promise.all(
      experimentIds.map((e) =>
        this.getExperiment(e, marketingId, userId, options)
      )
    );
    return new Map(experimentIds.map((e, idx) => [e, experiments[idx]]));
  }

  /**
   * getActiveExperiments fetches all running experiments from the experiments_meta.
   * Experiments are considered active, until they have been ended for over 1 month.
   *
   * @param marketingId The user's marketing id. Used to assign variants.
   */
  public async getActiveExperiments(
    marketingId: string
  ): Promise<Experiment[]> {
    const res = await this.httpClient.fetchExperimentMeta();

    res.forEach((e) => assignVariant(marketingId, e));

    return res;
  }

  /**
   * getRunningExperiments fetches all running experiments from the experiments_meta.
   *
   * @param marketingId The user's marketing id. Used to assign variants.
   * @param applicationName Optionally filter out only experiments with the supplied applicationName.
   */
  public async getRunningExperiments(
    marketingId: string,
    applicationName?: string
  ): Promise<Experiment[]> {
    let res = await this.getActiveExperiments(marketingId);

    res = res.filter((m) => m.status.key === ExperimentStatus.Running);

    if (applicationName) {
      res = res.filter(
        (m) => m.application && m.application === applicationName
      );
    }

    return res;
  }

  /**
   * getAndLogExperimentClientSide is a kitchen sink utility for client side experiments.
   *
   * @param experimentId is the vroom experiment id.
   */
  public async getAndLogExperimentClientSide(
    experimentId: string
  ): Promise<Experiment | undefined> {
    try {
      const experimentQueryKey = `experiment-${experimentId}`;
      const urlParams = new URLSearchParams(window.location.search);
      const forcedVariant = urlParams.get(experimentQueryKey);
      const forcedVariantInt = forcedVariant
        ? parseInt(forcedVariant, 10)
        : NaN;

      const options: ExperimentOptions | undefined =
        forcedVariantInt === 0 || forcedVariantInt === 1
          ? {
              variantOverrides: {
                [experimentId]: forcedVariantInt as VariantEnum,
              },
            }
          : undefined;

      const marketingId = this.catSDK.getUUID();
      const experiment = await this.getAndLogExperiment(
        experimentId,
        marketingId,
        undefined,
        options
      );
      return experiment;
    } catch {
      return undefined;
    }
  }
}
