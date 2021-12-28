export const removeLastNumber = (string) => {
  let foundFirstNumber = false;
  return string
    .split('')
    .reverse()
    .map((char) => {
      if (!foundFirstNumber && !isNaN(parseInt(char))) {
        foundFirstNumber = true;
        return '';
      } else {
        return char;
      }
    })
    .reverse()
    .join('');
};

export function hiddenString(length) {
  const dot = '\u2022';
  return new Array(length + 1).join(dot);
}
