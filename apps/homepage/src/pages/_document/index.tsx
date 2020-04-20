import { ServerStyleSheets } from '@material-ui/core/styles';
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

import FaviconSnippet from './FaviconSnippet';
import FontsSnippet from './FontsSnippet';
import GlobalEnvSnippet from './GlobalEnvSnippet';
import SegmentSnippet from './SegmentSnippet';

import theme from 'src/ui/theme';

class VroomDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const customEnhanceApp: Enhancer<AppType> = App => props =>
      materialSheets.collect(<App {...props} />)
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
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <FaviconSnippet />
          {/*
              Font Icons
              In order to use the font Icon component
          */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <FontsSnippet />
          <SegmentSnippet segmentWriteKey={process.env.SEGMENT_WRITE_KEY} />
          <GlobalEnvSnippet
            CDN_URL={process.env.CDN_URL}
            INVSEARCH_V3_URL={process.env.INVSEARCH_V3_URL}
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
