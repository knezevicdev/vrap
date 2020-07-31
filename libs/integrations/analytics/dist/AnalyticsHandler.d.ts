declare global {
    interface Window {
        ga?: Function;
    }
}
interface Experiment {
    assignedVariant: 0 | 1;
    optimizeId?: string;
}
declare class AnalyticsHandler {
    private static optimizeExperimentsString?;
    track(event: string, properties?: object): void;
    setAnonymousId(anonymousId: string): void;
    setExperiments(experiments?: Experiment[]): void;
    page(name: string, category?: string): void;
    identify(traits: object, userId?: string): void;
}
export default AnalyticsHandler;
