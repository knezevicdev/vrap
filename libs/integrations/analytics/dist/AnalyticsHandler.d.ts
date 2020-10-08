declare global {
    interface Window {
        ga?: Function;
    }
}
interface Experiment {
    id: string;
    assignedVariant: 0 | 1;
    optimizeId?: string;
}
declare class AnalyticsHandler {
    private static registeredExperimentsKey;
    private static registeredExperiments;
    private static optimizeExperimentsString?;
    private getVitParams;
    constructor();
    track(event: string, properties?: object): void;
    setAnonymousId(anonymousId: string): void;
    setExperiments(experiments?: Experiment[]): void;
    setOptimizeData(): void;
    storeRegisteredExperiments(): void;
    retrieveRegisteredExperiments(): void;
    registerExperiment(experiment: Experiment): void;
    createAdditionalTracker(id: string, name: string): void;
    page(name: string, category?: string): void;
    identify(traits: object, userId?: string): void;
}
export default AnalyticsHandler;
