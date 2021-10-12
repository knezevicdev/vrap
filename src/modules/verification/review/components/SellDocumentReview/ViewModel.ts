import Store from 'src/store';

export default class SellDocumentReviewViewModel {
  readonly SellDoctitle: string = 'Document Upload';
  readonly frontTitle: string = 'Front of Title Information';
  readonly backTitle: string = 'Back of Title Information';
  readonly lienRelease: string = 'Lien Release Letter';
  readonly exactMileage: string = 'Exact Mileage';
  readonly dlFront: string = "Front of Driver's License";
  readonly dlBack: string = "Back of Driver's License";
  readonly secondDlFront: string = "Front of Second Owner's Driver's License";
  readonly secondDlBack: string = "Back of Second Owner's Driver's License";
  readonly tiFront: string = 'Front of Title Information';
  readonly tiBack: string = 'Back of Title Information';
  readonly registration: string = 'Registration';
  readonly odometer: string = 'Odometer Picture';

  constructor(private store: Store) {}

  handleEditClick(): void {
    window.location.href = `/sell/verification/documents/${this.store.verification.offerId}`;
  }
}
