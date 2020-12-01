class CabinSizeViewModel {
  readonly crewCabLabel: string = '4 Door Crew Cab';
  readonly regularCabLabel: string = '2 Door Standard Cab';
  readonly extendedCabLabel: string = '4 Door Extended Cab';

  getCabinSizes = (): {
    filtersDataValue: string;
    display: string;
  }[] => {
    return [
      { filtersDataValue: 'crew_cab', display: this.crewCabLabel },
      { filtersDataValue: 'regular_cab', display: this.regularCabLabel },
      { filtersDataValue: 'extended_cab', display: this.extendedCabLabel },
    ];
  };
}

export default CabinSizeViewModel;
