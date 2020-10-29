class ContactInfoViewModel {
  constructor(locationName: string, imgUrl: string, googleMapsUrl: string) {
    this.locationName = locationName;
    this.imgUrl = imgUrl;
    this.googleMapsUrl = googleMapsUrl;
  }
  readonly tagline = `SELL US YOUR CAR LOCATION`;
  readonly subtitle = `We have thousands of cars in stock.`;
  readonly locationName: string;
  readonly imgUrl: string;
  readonly googleMapsUrl: string;
}

export default ContactInfoViewModel;
