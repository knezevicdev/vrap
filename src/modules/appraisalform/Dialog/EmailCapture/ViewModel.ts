import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

export default class EmailCaptureViewModel {
  readonly title: string = 'busy watching the big game?';
  readonly description: string = `Give us your email for a reminder to see how much you can score
  after it's over.`;
  readonly allSet: string = 'All set!';

  constructor(public analyticsHandler: AnalyticsHandler) {}
  tracksEmailCapture(
    eventName: string,
    loggedIn: boolean,
    mobile: number,
    nonInteraction: number,
    result: string | boolean
  ): void {
    this.analyticsHandler.tracksEmailCapture(
      eventName,
      loggedIn,
      mobile,
      nonInteraction,
      result
    );
  }
}
