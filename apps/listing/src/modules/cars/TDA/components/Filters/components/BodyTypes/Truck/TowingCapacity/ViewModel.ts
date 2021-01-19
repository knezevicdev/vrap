class TowingCapacityViewModel {
  readonly lessTowCapacityLabel: string = '< 5,000 to 6,500 lbs';
  readonly midTowCapacityLabel: string = '6,501 to 8,500 lb';
  readonly highTowCapacityLabel: string = '8,501 lbs +';

  getTowingCapacities = (): {
    filtersDataValue: string;
    display: string;
  }[] => {
    return [
      { filtersDataValue: 'less', display: this.lessTowCapacityLabel },
      { filtersDataValue: 'mid', display: this.midTowCapacityLabel },
      { filtersDataValue: 'high', display: this.highTowCapacityLabel },
    ];
  };
}

export default TowingCapacityViewModel;
