import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { get as _get } from 'lodash';
import { NextApiRequest } from 'next';
import getConfig from 'next/config';
import useragent from 'useragent';

const { serverRuntimeConfig } = getConfig();

function removeQueryStringFromUrl(inputUrl: string) {
  const queryStringIndex = inputUrl.indexOf('?');
  if (queryStringIndex !== -1) {
    return inputUrl.slice(0, queryStringIndex);
  } else {
    return inputUrl;
  }
}

function checkReferrer(req: NextApiRequest) {
  const referrer = req.headers.referer || req.headers.referrer;

  if (
    !referrer ||
    typeof referrer !== 'string' ||
    (!removeQueryStringFromUrl(referrer).endsWith('/sell/review') &&
      !removeQueryStringFromUrl(referrer).endsWith(
        '/sell/tradeIn-selfService-Review'
      ))
  )
    return false;

  return true;
}

const bannedUserAgents = [
  'rival iq',
  'antennapod',
  'espn',
  'audioboom',
  'pingdombot',
  'newrelicpingerbot',
  'statuscakebot',
  'facebookbot',
  'googleplusbot',
  'gmailimageproxy',
  'twitterbot',
  'msiecrawler',
  'pinterestbot',
  'facebook',
  'seznam.cz',
  'rackspacebot',
  'yandex browser',
  'python requests',
  'curl',
  'other',
];

function checkUserAgent(req: NextApiRequest) {
  const userAgentString = req.headers['user-agent'];
  const agent = useragent.parse(userAgentString);
  if (agent.family && agent.major && agent.minor) {
    const isBanned = bannedUserAgents.includes(agent.family.toLowerCase());
    if (isBanned) {
      return false;
    }
  }

  return true;
}

export function checkSignature(req: NextApiRequest, vinKey = 'payload.vin') {
  const signature = req.headers['x-signature'];
  const signatureSecret = req.headers['x-token'];

  if (
    !signature ||
    !signatureSecret ||
    typeof signature !== 'string' ||
    typeof signatureSecret !== 'string' ||
    !serverRuntimeConfig.JWT_SECRET_KEY
  )
    return false;

  try {
    const decoded = jwt.verify(
      signatureSecret,
      serverRuntimeConfig.JWT_SECRET_KEY
    );
    if (typeof decoded === 'string') return false;
    if (decoded.vin !== _get(req.body, vinKey)) return false;
  } catch (err) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', signatureSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (expectedSignature !== signature) return false;

  return true;
}

export default function checkBotActivity(req: NextApiRequest): boolean {
  if (!checkReferrer(req)) return false;
  if (!checkUserAgent(req)) return false;
  if (!checkSignature(req)) return false;
  return true;
}
