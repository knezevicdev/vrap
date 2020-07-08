import { danger, fail, warn } from 'danger';
import fs from 'fs';
import path from 'path';

// Check that someone has been assigned to this PR
if (danger.bitbucket_cloud.pr.reviewers.length === 0) {
  warn(
    'Please assign someone to merge this PR, and optionally include people who should review.'
  );
}

function recursiveReaddirSync(dirPath: string): string[] {
  let filepaths: string[] = [];
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filepath = path.join(dirPath, file);
    const stats = fs.lstatSync(filepath);
    if (stats.isDirectory()) {
      filepaths = filepaths.concat(recursiveReaddirSync(filepath));
    } else {
      filepaths.push(filepath);
    }
  });
  return filepaths;
}

const allAppFiles = recursiveReaddirSync('./apps');
allAppFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');

  // Check that apps are not importing the source code of libraries.
  // They should be importing built versions.
  const importStatementRegex = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
  const importStatements = content.match(importStatementRegex);
  if (!importStatements) {
    return;
  }
  importStatements.forEach((importStatement) => {
    if (importStatement.includes('../libs')) {
      fail('Apps cannot import library source code. Use the built version!');
    }
  });

  // Check that static nextjs page files are warned about
  // the limitations of our current env var solution.
  // If we update our NextJS env var solution to inject env vars at build time, this warning can be removed.
  if (
    file.includes('/pages/') &&
    !file.includes('/api') &&
    !file.includes('_app') &&
    !file.includes('_document') &&
    !file.includes('hp') &&
    !content.includes('getInitialProps')
  ) {
    warn(
      'There are files within a "pages" directory that have no "getInitialProps" function. If these files are part of a NextJS application, be aware that env vars currently do not work on static pages.'
    );
  }
});
