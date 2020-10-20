import { ServerStyleSheets } from '@material-ui/core/styles';
import { AnalyticsSnippet } from '@vroom-web/analytics-integration';
import getConfig from 'next/config';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

const { serverRuntimeConfig } = getConfig();

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = (): ReturnType<typeof ctx.renderPage> =>
        originalRenderPage({
          enhanceApp: (App) => (props): JSX.Element =>
            styledComponentsSheet.collectStyles(
              materialSheets.collect(<App {...props} />)
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render(): JSX.Element {
    const segmentWriteKey = serverRuntimeConfig.SEGMENT_WRITE_KEY;

    return (
      <Html lang="en">
        <Head></Head>
        {segmentWriteKey && (
          <AnalyticsSnippet
            appName="Vroom Web - Product"
            segmentWriteKey={segmentWriteKey}
          />
        )}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
