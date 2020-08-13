/// <reference types="react" />
interface PropsFromProvider {
    className?: string;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
declare class LogoViewModel {
    private analyticsHandler;
    private onClick?;
    readonly className?: string;
    readonly href: string;
    constructor(propsFromProvider: PropsFromProvider);
    handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>): void;
}
export default LogoViewModel;
