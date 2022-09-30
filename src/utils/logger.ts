import winston from 'winston';

import redactObject from './redact';

export default winston.createLogger({
  format: winston.format.combine(
    winston.format((info) => redactObject(info))(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});
