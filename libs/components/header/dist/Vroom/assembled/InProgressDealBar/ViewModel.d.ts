import Store from './store';
declare class InProgressDealBarViewModel {
    readonly statusText: string;
    readonly buttonText: string;
    readonly className?: string;
    private store;
    private currencyFormatter;
    private analyticsHandler;
    constructor(store: Store, className?: string);
    handleMount(): void;
    show(): boolean;
    yearMakeModel(): string;
    trim(): string;
    price(): string;
    private getResumeStepHref;
    handleButtonClick(): void;
}
export default InProgressDealBarViewModel;
