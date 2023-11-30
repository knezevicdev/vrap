const fs = require('fs');

const getEnvVars = async (service = 'appraisal') => {
  try {
    console.info(`Fetching ${service} env variables from QA...\n`);
    const namespace = await getNamespace(service);
    if (!namespace) {
      console.error(`No ${service} deployment namespace found...`);
      return;
    }

    const url = `https://eks-service-center-int.qa.vroom.cloud/${namespace}/secrets/us-west-2-qa-blue-secret`;
    const response = await fetch(url);
    const body = await response.json();
    const envValues = toEnv(body.data)
      .join('\n')
      .replace("CURRENT_ENV='qa'", "CURRENT_ENV='local'");
    await fs.writeFileSync('.env', envValues);
    console.info('Variables saved to .env file');
  } catch (err) {
    console.error(err.message);
  }
};

const getNamespace = async (service) => {
  try {
    const url = `https://eks-service-center-int.qa.vroom.cloud/namespaces`;
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `HTTP Error Response: ${response.status} ${response.statusText}`
      );
    }

    const body = await response.json();

    const items = body?.items;
    const serviceNamespace = items.find((x) =>
      x.metadata.name.includes(service)
    );

    return serviceNamespace?.metadata.name;
  } catch (err) {
    console.error(`Error fetching namespace: ${err.message}`);
    return undefined;
  }
};

const toEnv = (envVars) => {
  return Object.keys(envVars).map((key) => `${key}='${atob(envVars[key])}'`);
};

getEnvVars().catch((err) => {
  console.error(err);
  process.exit(1);
});
