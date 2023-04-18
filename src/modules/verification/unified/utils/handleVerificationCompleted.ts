const handleVerificationCompleted = (
  finalPayment: null | number,
  offerPrice: number | undefined,
  priceId: string
) => {
  if (finalPayment !== null) {
    if (finalPayment > 0) {
      window.location.href = `/appraisal/paymentmethod?priceId=${priceId}`;
    } else {
      window.location.href = '/appraisal/congratulations';
    }
  } else {
    if (offerPrice && offerPrice > 0) {
      window.location.href = `/appraisal/paymentmethod?priceId=${priceId}`;
    } else {
      window.location.href = '/appraisal/congratulations';
    }
  }
};

export default handleVerificationCompleted;
