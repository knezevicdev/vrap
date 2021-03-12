import { ServerStyleSheets } from '@material-ui/core/styles';
import { AnalyticsSnippet } from '@vroom-web/analytics-integration';
import { UISnippet } from '@vroom-web/ui';
import { Brand, determineWhitelabel } from '@vroom-web/whitelabel';
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

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

interface Props extends DocumentInitialProps {
  brand: Brand;
}

class MarketingDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
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
      const brand = determineWhitelabel(ctx);

      return {
        ...initialProps,
        brand,
        styles: (
          <>
            {initialProps.styles}
            {styledComponentsSheet.getStyleElement()}
            {materialSheets.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render(): JSX.Element {
    let segmentWriteKey = serverRuntimeConfig.SEGMENT_WRITE_KEY;
    if (this.props.brand === Brand.SANTANDER) {
      segmentWriteKey = serverRuntimeConfig.SANTANDER_SEGMENT_WRITE_KEY;
    } else if (this.props.brand === Brand.TDA) {
      segmentWriteKey = serverRuntimeConfig.TDA_SEGMENT_WRITE_KEY;
    }

    return (
      <Html lang="en">
        <Head>
          <UISnippet
            brand={this.props.brand}
            staticAssetsHostUrl={publicRuntimeConfig.STATIC_ASSETS_HOST_URL}
          />
          {segmentWriteKey && (
            <AnalyticsSnippet
              appName="Vroom Web - Marketing"
              segmentWriteKey={segmentWriteKey}
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MarketingDocument;

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
