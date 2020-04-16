const changeUrl = (
  state: string[] | undefined,
  values: string[] | undefined,
  error: boolean
): boolean => {
  if (state !== values && values) {
    const left = values[0];
    const right = values[1];

    if (parseInt(left) && parseInt(right) && !error) {
      return true;
    }
  }

  return false;
};

const updateInputState = (
  state: string[] | undefined,
  values: string[] | undefined
): boolean => {
  return state !== values;
};

export { changeUrl, updateInputState };
