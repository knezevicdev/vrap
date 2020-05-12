import React from 'react';

import { GlobalEnv } from 'src/globalEnv';

type ClientEnvVarSnippetProps = GlobalEnv;

const ClientEnvVarSnippet: React.FC<ClientEnvVarSnippetProps> = (props) => {
  const str = JSON.stringify({ ...props });
  console.log('GlobalEnvSnippet props', props);
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__GLOBAL_ENV__ = ${str};`,
      }}
    />
  );
};

export default ClientEnvVarSnippet;
