const serializeError = (error: unknown) => {
  if (typeof error !== 'object' || Array.isArray(error) || error === null)
    return {};

  return JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));
};

export default serializeError;
