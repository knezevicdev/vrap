class ViewModel {
  readonly title: string = "We're hiring!";
  readonly buttonText: string = 'SEE ALL OPEN POSITIONS';

  handleButtonClick = (): void => {
    window.location.href = `/careers`;
  };
}

export default ViewModel;
