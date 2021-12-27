import { decrypt } from '../utils/encrypted';
export const SSN = 'ssn';

export function isEncryptedField(field) {
  // NOTE: removing SSN from here will require code changes (eg. validation.js)
  if (field === SSN) {
    return true;
  }

  return false;
}

// returns decrypted value
export function getDecryptedValue(field, propsOrState) {
  const fieldSplit = field.split('_');
  const unprefixedField = fieldSplit[fieldSplit.length - 1];

  try {
    if (isEncryptedField(unprefixedField)) {
      return decrypt(propsOrState[field]);
    }
  } catch (e) {
    console.error('Error', e);
    return propsOrState[field];
  }

  return propsOrState[field];
}
