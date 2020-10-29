class ContactInfoViewModel {
  constructor(locationName: string, imgUrl: string, googleMapsUrl: string) {
    this.locationName = locationName;
    this.imgUrl = imgUrl;
    this.googleMapsUrl = googleMapsUrl;
  }
  readonly tagline = `SELL US YOUR CAR LOCATION`;
  readonly subtitle = 'We have thousands of cars\xa0in\xa0stock.';

  readonly locationName: string;
  readonly imgUrl: string;
  readonly googleMapsUrl: string;

  isStafford() {
    return this.locationName === 'Stafford';
  }
}

export default ContactInfoViewModel;
