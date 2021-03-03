class DocumentUploadViewModel {
  readonly title = 'Upload your docs';
  readonly description = `We need to verify some additional information. 
    Please upload the requested documents in your account.`;
  readonly label = 'Upload Documents';

  private dealId: number;
  private trackDocUploadClicked?: () => void;

  constructor(dealId: number, trackDocUploadClicked?: () => void) {
    this.dealId = dealId;
    this.trackDocUploadClicked = trackDocUploadClicked;
  }

  handleClick = (): void => {
    this.trackDocUploadClicked && this.trackDocUploadClicked();
    window.location.href = `/my-account/transactions/${this.dealId}/Pending/details`;
  };
}

export default DocumentUploadViewModel;
