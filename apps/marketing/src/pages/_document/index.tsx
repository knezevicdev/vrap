import { ServerStyleSheets } from '@material-ui/core/styles';
import { AnalyticsSnippet } from '@vroom-web/analytics-integration';
import { Brand, UISnippet } from '@vroom-web/ui';
import { AppType, Enhancer, RenderPage } from 'next/dist/next-server/lib/utils';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

import globalEnv from '../../globalEnv';
import GlobalEnvSnippet from './GlobalEnvSnippet';

class VroomDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const customEnhanceApp: Enhancer<AppType> = (App) => (props) =>
      materialSheets.collect(<App {...props} />);
    const customRenderPage: RenderPage = () =>
      originalRenderPage({
        enhanceApp: customEnhanceApp,
      });
    ctx.renderPage = customRenderPage;

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {materialSheets.getStyleElement()}
        </>
      ),
    };
  }

  render(): JSX.Element {
    const segmentWriteKey = process.env.SEGMENT_WRITE_KEY;

    // FIT-570
    // TODO: replace this mechanism with the actual one.
    // Some data should come from ctx.req, rather than from ctx.query.
    const query = this.props.__NEXT_DATA__.query;
    const brandQueryParam = query.brand;
    const brand =
      brandQueryParam === 'santander' ? Brand.SANTANDER : Brand.VROOM;

    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <UISnippet brand={brand} hostUrl={globalEnv.ASSET_PREFIX || ''} />
          {segmentWriteKey && (
            <AnalyticsSnippet
              appName="Vroom Web - Marketing"
              segmentWriteKey={segmentWriteKey}
            />
          )}
          <GlobalEnvSnippet
            ASSET_PREFIX={globalEnv.ASSET_PREFIX}
            DATA_DOG_LOG_COLLECTION_TOKEN={
              globalEnv.DATA_DOG_LOG_COLLECTION_TOKEN
            }
            NAME={globalEnv.NAME}
            VERSION={globalEnv.VERSION}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default VroomDocument;

// Resolution order
//
// On the server:
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. document.getInitialProps
// 4. app.render
// 5. page.render
// 6. document.render
//
// On the server with error:
// 1. document.getInitialProps
// 2. app.render
// 3. page.render
// 4. document.render
//
// On the client
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. app.render
// 4. page.render
