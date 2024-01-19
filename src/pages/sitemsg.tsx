import { Storage } from '@google-cloud/storage';
import { GetServerSidePropsContext } from 'next';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const SiteMsgPage = () => {
  return null;
};

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const serviceAccount = JSON.parse(
    serverRuntimeConfig.FIREBASE_SERVICE_ACCOUNT
  );

  const storage = new Storage({
    credentials: {
      client_email: serviceAccount.client_email,
      private_key: serviceAccount.private_key,
    },
  });

  const bucketName = 'vroom-acquisitions-v2.appspot.com';
  const fileName = 'sitemsg.html';

  async function getSiteMsg() {
    const file = storage.bucket(bucketName).file(fileName);

    let fileContent = '';
    const stream = file.createReadStream();

    stream.on('data', (chunk) => {
      fileContent += chunk;
    });

    return new Promise((resolve, reject) => {
      stream.on('end', () => {
        resolve(fileContent);
      });
      stream.on('error', reject);
    });
  }

  const siteMsg = await getSiteMsg();

  res.setHeader('Content-Type', 'text/html');
  res.write(siteMsg);
  res.end();

  return { props: {} };
};

export default SiteMsgPage;
