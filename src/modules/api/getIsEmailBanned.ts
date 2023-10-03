import admin from 'firebase-admin';
import getConfig from 'next/config';

import logger from '../../utils/logger';

const { serverRuntimeConfig } = getConfig();

async function getBannedEmails(): Promise<string[]> {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(serverRuntimeConfig.FIREBASE_SERVICE_ACCOUNT)
      ),
    });
  }

  try {
    const template = await admin.remoteConfig().getTemplate();

    const bannedEmailsConfigValue =
      template.parameters.appraisal_restricted_emails.conditionalValues?.[
        serverRuntimeConfig.FIREBASE_ENV
      ];
    return JSON.parse((bannedEmailsConfigValue as { value: string })?.value);
  } catch (error) {
    logger.error('Failed to get remote config', { error });
    return [];
  }
}

export async function getIsEmailBanned(email: string): Promise<boolean> {
  const bannedEmails = await getBannedEmails();

  return bannedEmails.includes(email);
}
