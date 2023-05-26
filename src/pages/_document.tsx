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

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const BRANCH_IO_KEY = publicRuntimeConfig.BRANCH_IO_KEY;
const SEGMENT_WRITE_KEY = serverRuntimeConfig.SEGMENT_WRITE_KEY;
const ANALYTICS_DISABLE_PII_PERSISTENCE =
  publicRuntimeConfig.ANALYTICS_DISABLE_PII_PERSISTENCE;
const GOOGLE_MAPS_API_KEY = publicRuntimeConfig.GOOGLE_MAPS_API_KEY;

export default class AppraisalDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const styledComponentsSheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, styledComponentsSheet.getStyleElement()],
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
          {segmentWriteKey && (
            <AnalyticsSnippet
              segmentWriteKey={segmentWriteKey}
              disableClientPersistence={Boolean(
                parseInt(ANALYTICS_DISABLE_PII_PERSISTENCE)
              )}
            />
          )}
          <script
            defer
            dangerouslySetInnerHTML={{
              __html: `(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking".split(" "), 0);
            branch.init("${BRANCH_IO_KEY}");`,
            }}
          />
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=quarterly&libraries=places`}
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
