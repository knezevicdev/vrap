module.exports = function (plop) {
  // app generator
  plop.setGenerator('create-app', {
    description: 'Create a new application in /apps',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of your new application',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'apps/{{name}}/.babelrc',
        templateFile: 'plop-templates/new-app/babel.hbs',
      },
      {
        type: 'add',
        path: 'apps/{{name}}/docker/Dockerfile',
        templateFile: 'plop-templates/new-app/dockerfile.hbs',
      },
      {
        type: 'add',
        path: 'apps/{{name}}/docker/docker-compose.yaml',
        templateFile: 'plop-templates/new-app/dockercompose.hbs',
      },
      {
        type: 'add',
        path: 'apps/{{name}}/jest.config.js',
        templateFile: 'plop-templates/new-app/jestconfig.hbs',
      },
      {
        type: 'add',
        path: 'apps/{{name}}/next.config.js',
        templateFile: 'plop-templates/new-app/nextconfig.hbs',
      },
      {
        type: 'add',
        path: 'apps/{{name}}/package.json',
        templateFile: 'plop-templates/new-app/packagejson.hbs',
      },
      {
        type: 'add',
        path: 'apps/{{name}}/src/pages/api/version.ts',
        templateFile: 'plop-templates/new-app/apiversion.hbs',
      },
      {
        type: 'add',
        path: 'apps/{{name}}/tsconfig.json',
        templateFile: 'plop-templates/new-app/tsconfig.hbs',
      },
      {
        type: 'add',
        path: '.circleci/src/jobs/@{{name}}.yml',
        templateFile: 'plop-templates/new-app/jobsyml.hbs',
      },
      {
        type: 'add',
        path: '.circleci/src/workflows/@{{name}}.yml',
        templateFile: 'plop-templates/new-app/workflowsyml.hbs',
      },
      {
        type: 'add',
        path: 'apps/{{name}}/.devcontainer/devcontainer.json',
        templateFile: 'plop-templates/new-app/devcontainerjson.hbs',
      },
    ],
  });

  plop.setGenerator('create-base-page', {
    description: 'Create the base page in for /app',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: `Please enter the app you're creating a base Page for`,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'apps/{{name}}/src/Page.tsx',
        templateFile: 'plop-templates/base-page/page.hbs',
      },
      {
        type: 'add',
        path: 'apps/{{name}}/src/pages/_app.tsx',
        templateFile: 'plop-templates/base-page/_app.hbs',
      },
      {
        type: 'add',
        path: 'apps/{{name}}/src/pages/_document.tsx',
        templateFile: 'plop-templates/base-page/_document.hbs',
      },
      {
        type: 'add',
        path: 'apps/{{name}}/src/pages/index.tsx',
        templateFile: 'plop-templates/base-page/pageindex.hbs',
      },
    ],
  });
};
