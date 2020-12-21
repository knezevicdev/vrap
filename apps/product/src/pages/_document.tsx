import { ServerStyleSheets } from '@material-ui/core/styles';
import { AnalyticsSnippet } from '@vroom-web/analytics-integration';
import { UISnippet } from '@vroom-web/ui';
import { Brand, determineWhitelabel } from '@vroom-web/whitelabel';
import getConfig from 'next/config';
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

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

interface Props extends DocumentInitialProps {
  brand: Brand;
}

class ProductDocument extends Document<Props> {
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

    const brand = determineWhitelabel(ctx);

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
              appName="Vroom Web - Product"
              segmentWriteKey={segmentWriteKey}
            />
          )}
          {this.props.brand === Brand.VROOM && (
            <script
              defer
              dangerouslySetInnerHTML={{
                __html: `(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking".split(" "), 0);
            branch.init("${publicRuntimeConfig.BRANCH_IO_KEY}");`,
              }}
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

export default ProductDocument;

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
