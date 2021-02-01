class HeroViewModel {
  constructor(
    locationName: string,
    imgUrl: string,
    googleMapsUrl: string,
    closed: boolean
  ) {
    this.locationName = locationName;
    this.imgUrl = imgUrl;
    this.googleMapsUrl = googleMapsUrl;
    this.closed = closed;
  }
  readonly tagline = `SELL US YOUR CAR LOCATION`;
  readonly subtitle = 'We have thousands of cars\xa0in\xa0stock.';

  readonly locationName: string;
  readonly imgUrl: string;
  readonly googleMapsUrl: string;
  readonly closed: boolean;

  isStafford(): boolean {
    return this.locationName === 'Stafford';
  }
}

export default HeroViewModel;
