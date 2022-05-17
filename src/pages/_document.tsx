import { ServerStyleSheets } from '@material-ui/core/styles';
import { AnalyticsSnippet } from '@vroom-web/analytics-integration';
import { Brand, UISnippet } from '@vroom-web/ui';
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

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const STATIC_ASSETS_HOST_URL =
  publicRuntimeConfig.NEXT_PUBLIC_STATIC_ASSETS_HOST_URL;
const BRANCH_IO_KEY = publicRuntimeConfig.BRANCH_IO_KEY;
const SEGMENT_WRITE_KEY = serverRuntimeConfig.SEGMENT_WRITE_KEY;

export default class AppraisalDocument extends Document {
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
    const segmentWriteKey = SEGMENT_WRITE_KEY;

    return (
      <Html lang="en">
        <Head>
          <UISnippet
            brand={Brand.VROOM}
            staticAssetsHostUrl={STATIC_ASSETS_HOST_URL}
          />
          {segmentWriteKey && (
            <AnalyticsSnippet segmentWriteKey={segmentWriteKey} />
          )}
          <script
            defer
            dangerouslySetInnerHTML={{
              __html: `(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking".split(" "), 0);
            branch.init("${BRANCH_IO_KEY}");`,
            }}
          />
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=quarterly&libraries=places`}
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
