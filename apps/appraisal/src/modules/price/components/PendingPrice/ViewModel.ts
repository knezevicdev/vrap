class PendingPriceViewModel {
  readonly sitTight: string = 'sit tight';
  readonly findCar: string = 'find your next car';
  readonly takingALook: string =
    'Our buying specialists are taking a closer look and we will provide you a guranteed offer in one business day.';

  handleFindCar(): void {
    const url = `/cars`;
    window.location.href = url;
  }
}

export default PendingPriceViewModel;
