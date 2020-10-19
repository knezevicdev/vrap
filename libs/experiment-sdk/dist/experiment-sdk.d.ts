import { HttpClient } from './httpclient';
import { Experiment, VariantEnum } from './types';
/**
 * ClientOptions is the optional constructor parameters for Client.
 */
export interface ClientOptions {
    experimentApiBase?: string;
    impressionApiBase?: string;
    httpClient?: HttpClient;
    cacheExpiration?: number;
}
/**
 * ExperimentOptions contains options to modify the behavior of the
 * experiment related methods.
 */
export interface ExperimentOptions {
    variantOverrides?: {
        [key: string]: VariantEnum;
    };
}
export declare function assignVariant(marketingId: string, experiment: Experiment): void;
/**
 * Client is the main sdk for the a/b testing framework.
 * There should only be one client active in an application at a given time.
 */
export declare class ExperimentSDK {
    private readonly httpClient;
    private readonly cache;
    private readonly cacheExpiration;
    private readonly catSDK;
    /**
     * @param options are the client options. It is not necessary to update these
     * unless you are debugging or testing the sdk.
     */
    constructor(options?: ClientOptions);
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
    getAndLogExperiment(experimentId: string, marketingId: string, userId?: string, options?: ExperimentOptions): Promise<Experiment | undefined>;
    /**
     * getExperiments gets the experiment & active variant for a given experiment id.
     *
     * @param experimentId is the vroom experiment id.
     * @param marketingId is a unique identifier for a user's session.
     * @param userId is a logged in user's id.
     * @param options are options to modify the getExperiment's behavior
     * @return returns the variant id (number)
     */
    getExperiment(experimentId: string, marketingId: string, _userId?: string, options?: ExperimentOptions): Promise<Experiment | undefined>;
    /**
     * logImpression logs the impression to the analytics backend.
     *
     * @param experiment is the experiment returned from getExperiment
     * @param marketingId is a unique identifier for a user's session.
     * @param userId is a logged in user's id.
     */
    logImpression(experiment: Experiment, marketingId: string, userId?: string): Promise<void>;
    /**
     * getExperimentsBulk concurrently fetches a list of experiments
     *
     * @param experimentIds is a list of vroom experiment ids.
     * @param marketingId is a unique identifier for a user's session.
     * @param userId is a logged in user's id.
     * @param options are options to modify the getExperiment's behavior
     */
    getExperimentsBulk(experimentIds: string[], marketingId: string, userId?: string, options?: ExperimentOptions): Promise<Map<string, Experiment | undefined>>;
    /**
     * getActiveExperiments fetches all running experiments from the experiments_meta.
     * Experiments are considered active, until they have been ended for over 1 month.
     *
     * @param marketingId The user's marketing id. Used to assign variants.
     */
    getActiveExperiments(marketingId: string): Promise<Experiment[]>;
    /**
     * getRunningExperiments fetches all running experiments from the experiments_meta.
     *
     * @param marketingId The user's marketing id. Used to assign variants.
     * @param applicationName Optionally filter out only experiments with the supplied applicationName.
     */
    getRunningExperiments(marketingId: string, applicationName?: string): Promise<Experiment[]>;
    /**
     * getAndLogExperimentClientSide is a kitchen sink utility for client side experiments.
     *
     * @param experimentId is the vroom experiment id.
     */
    getAndLogExperimentClientSide(experimentId: string): Promise<Experiment | undefined>;
}
