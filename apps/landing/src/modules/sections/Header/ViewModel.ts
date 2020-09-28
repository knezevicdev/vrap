class HeaderViewModel {
  readonly button = `FIND YOURS`;
  readonly logoHref = '/';

  onClick = (): void => {
    window.location.href = 'https://www.vroom.com/cars/jeep/wrangler';
  };
}

export default HeaderViewModel;
