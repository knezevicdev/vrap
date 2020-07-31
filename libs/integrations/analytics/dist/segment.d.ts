export declare function onAnalyticsReady(callback: () => void): void;
export declare function setAnonymousId(anonymousId: string): void;
export declare function page(name: string, properties?: object): void;
export declare function track(event: string, properties?: object): void;
export declare function identify(traits: object, userId?: string): void;
