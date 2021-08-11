export const displayCurrency = (num: number): string => {
  return '$' + Math.round(num).toLocaleString();
};

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

// 2020-04-30T00:00:00Z => April 30th, 2020
export const parsedDateTime = (dateTime: string): string => {
  const parsedDate = new Date(dateTime);

  const year = parsedDate.getUTCFullYear();
  const month = MONTHS[parsedDate.getUTCMonth()].label;
  const day = parsedDate.getUTCDate();

  return `${month} ${day}, ${year}`;
};
