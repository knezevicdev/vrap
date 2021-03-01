class DocumentUploadViewModel {
  readonly title = 'Upload your docs';
  readonly description = `We need to verify some additional information. 
    Please upload the requested documents in your account.`;
  readonly label = 'Upload Documents';

  private dealId: number;

  constructor(dealId: number) {
    this.dealId = dealId;
  }

  handleClick = (): void => {
    window.location.href = `/my-account/transactions/${this.dealId}/Pending/details`;
  };
}

export default DocumentUploadViewModel;
