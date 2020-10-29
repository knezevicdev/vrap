class ContactInfoViewModel {
  constructor(locationName: string, imgUrl: string, googleMapsUrl: string) {
    this.locationName = locationName;
    this.imgUrl = imgUrl;
    this.googleMapsUrl = googleMapsUrl;
  }
  readonly title = `SELL US YOUR CAR LOCATION`;
  readonly locationName: string;
  readonly imgUrl: string;
  readonly googleMapsUrl: string;
}

export default ContactInfoViewModel;
