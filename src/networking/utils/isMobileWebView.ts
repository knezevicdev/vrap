import { ParsedUrlQuery } from 'querystring';

export function isMobileWebView(query: ParsedUrlQuery): boolean {
  return (
    query['utm_source'] === 'vroom_app_android' ||
    query['utm_source'] === 'vroom_app_ios'
  );
}
