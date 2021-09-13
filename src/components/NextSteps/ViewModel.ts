class NextStepsViewModel {
  readonly nextSteps: string = 'next steps';
  readonly verifyOwnership: string = 'Verify Ownership';
  readonly signContracts: string = 'Sign Contracts';
  readonly wePickUp: string = 'We Pick Up, You Get Paid';
  readonly requestDocuments: string = `We'll request relevant documents and additional information to verify vehicle ownership before the price expires.`;
  readonly sendAnEmail: string = `We'll send an email with a contract to e-Sign, and may require some additional paperwork by mail in order to finalize the deal.`;
  readonly scheduleATime: string = `We'll schedule a time to pick up your vehicle. Once we have your car, we’ll send your payment within 2-3 business days.`;
  readonly nextStepsAB: { title: string; description: string }[] = [
    {
      title: 'Verify ownership',
      description:
        "You'll upload relevant documents and additional information for us to verify ownership.",
    },
    {
      title: 'Sign contracts',
      description:
        "You'll receive a contract to e-Sign to finalize the deal. It may require some additional paperwork by mail.",
    },
    {
      title: 'Vehicle pick-up and payment',
      description:
        "We'll schedule a time to pick up your vehicle. You'll receive your payment within 2-3 business days from pick-up.",
    },
  ];
}

export default NextStepsViewModel;
