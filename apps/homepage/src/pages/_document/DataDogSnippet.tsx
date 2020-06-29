import { LogsUserConfiguration } from '@datadog/browser-logs';
import React from 'react';

declare global {
  interface Window {
    // DD_LOGS: {
    //   logger: {
    //     debug(message: string, context?: object | undefined): void;
    //     error(message: string, context?: object | undefined): void;
    //     info(message: string, context?: object | undefined): void;
    //     log(
    //       message: string,
    //       context?: object | undefined,
    //       status?: 'error' | 'debug' | 'info' | 'warn' | undefined
    //     ): void;
    //     warn(message: string, context?: object | undefined): void;
    //     setContext(context: object): void;
    //     addContext(key: string, value: any): void;
    //   };
    //   init(userConfiguration: LogsUserConfiguration): void;
    //   addLoggerGlobalContext(key: string, value: any): void;
    //   setLoggerGlobalContext(context: object): void;
    // };
    DD_LOGS: any;
  }
}

const DataDogSnippet: React.FC<{ clientToken: string }> = ({ clientToken }) => {
  const init: LogsUserConfiguration = {
    clientToken,
    datacenter: 'us' as LogsUserConfiguration['datacenter'],
    forwardErrorsToLogs: true,
    sampleRate: 100,
    silentMultipleInit: true,
  };
  const context = { service: 'vroom-web-homepage' };
  return (
    <>
      <script
        type="text/javascript"
        src="https://www.datadoghq-browser-agent.com/datadog-logs-us.js"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.DD_LOGS && DD_LOGS.init(${JSON.stringify(init)});
          window.DD_LOGS && DD_LOGS.setLoggerGlobalContext(${JSON.stringify(
            context
          )})
        `,
        }}
      />
    </>
  );
};

export default DataDogSnippet;
