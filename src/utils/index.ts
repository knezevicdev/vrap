export const displayCurrency = (num: number | undefined): string => {
  if (!num) {
    return '$';
  }
  return '$' + Math.round(num).toLocaleString();
};
