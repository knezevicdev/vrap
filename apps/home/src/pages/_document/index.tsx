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

interface Props extends DocumentInitialProps {
  brand: Brand;
}

class VroomDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
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

    const { req, query } = ctx;
    const headerBrandKey = 'x-brand';
    const santanderKey = 'santander';
    const brandHeader = req && req.headers[headerBrandKey];
    const queryBrand = query.brand;
    const brand: Brand =
      (brandHeader || queryBrand) == santanderKey
        ? Brand.SANTANDER
        : Brand.VROOM;

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      brand,
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

    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <UISnippet
            brand={this.props.brand}
            staticAssetsHostUrl={globalEnv.STATIC_ASSETS_HOST_URL || ''}
          />
          {segmentWriteKey && (
            <AnalyticsSnippet
              appName="Vroom Web - Home"
              segmentWriteKey={segmentWriteKey}
            />
          )}
          <GlobalEnvSnippet
            GEARBOX_PRIVATE_URL={globalEnv.GEARBOX_PRIVATE_URL}
            GEARBOX_PUBLIC_URL={globalEnv.GEARBOX_PUBLIC_URL}
            INVSEARCH_V3_URL={globalEnv.INVSEARCH_V3_URL}
            BASE_PATH={globalEnv.BASE_PATH}
            DATA_DOG_LOG_COLLECTION_TOKEN={
              globalEnv.DATA_DOG_LOG_COLLECTION_TOKEN
            }
            NAME={globalEnv.NAME}
            STATIC_ASSETS_HOST_URL={globalEnv.STATIC_ASSETS_HOST_URL}
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
