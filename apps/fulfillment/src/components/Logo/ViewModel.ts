interface PropsFromProvider {
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

class LogoViewModel {
  private onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  readonly className?: string;
  readonly href: string;

  constructor(propsFromProvider: PropsFromProvider) {
    this.className = propsFromProvider.className;
    this.href = propsFromProvider.href || '/';
    this.onClick = propsFromProvider.onClick;
  }

  handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>): void {
    if (this.onClick) {
      this.onClick(event);
    }
  }
}

export default LogoViewModel;
