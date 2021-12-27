import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const password = '(#*$jaoi.L'; // for SSN sessionStorage on client-side

export function encrypt(text) {
  if (text == null || text === '') {
    return null;
  }

  const cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function decrypt(text) {
  if (text == null || text === '') {
    return null;
  }

  try {
    const decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch (e) {
    //console.error('Error', e);
    return null;
  }
}
