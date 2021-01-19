class BedLengthViewModel {
  readonly shortBedLabel: string = 'Short: < 60" to 73"';
  readonly regularBedLabel: string = 'Regular: 74" to 85"';
  readonly longBedLabel: string = 'Long: 86" to 96"';

  getBedLengths = (): {
    filtersDataValue: string;
    display: string;
  }[] => {
    return [
      { filtersDataValue: 'short', display: this.shortBedLabel },
      { filtersDataValue: 'regular', display: this.regularBedLabel },
      { filtersDataValue: 'long', display: this.longBedLabel },
    ];
  };
}

export default BedLengthViewModel;
