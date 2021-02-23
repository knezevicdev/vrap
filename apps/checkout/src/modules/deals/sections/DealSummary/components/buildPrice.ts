export const buildPrice = (price?: number): string => {
  if (!price) return `-`;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(price);
};
