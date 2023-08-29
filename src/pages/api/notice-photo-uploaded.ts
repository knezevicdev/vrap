import { google } from 'googleapis';
import { GoogleAuth } from 'googleapis-common';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import logger from '../../utils/logger';
import requestHandler from '../../utils/requestHandler';

const { serverRuntimeConfig } = getConfig();

async function updateOrInsertRow(vin: string) {
  const currentDate = new Date().toLocaleString('en-US');

  const sheets = google.sheets('v4');
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(serverRuntimeConfig.GOOGLE_SERVICE_ACCOUNT),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = (await auth.getClient()) as never as GoogleAuth;

  const spreadsheetId =
    serverRuntimeConfig.APPRAISAL_PHOTOS_SPREADSHEET_ID as string;
  const range = 'List!A:A';

  try {
    const res = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range,
    });

    const rows = res.data.values;
    let rowIndexToUpdate = -1;

    if (rows) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] === vin) {
          rowIndexToUpdate = i;
          break;
        }
      }
    }

    if (rowIndexToUpdate !== -1) {
      await sheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: `List!B${rowIndexToUpdate + 1}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[currentDate]],
        },
      });
    } else {
      await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [[vin, currentDate]],
        },
      });
    }
  } catch (err) {
    logger.error('Error updating or inserting row:', err);
  }
}

export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const vin = req.body.vin;

    try {
      await updateOrInsertRow(vin);
      res.json({ success: true });
    } catch (e) {
      logger.error('Error updating or inserting row:', e);
      res.json({ success: false });
    }
  },
  {
    method: 'POST',
  }
);
