import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class ChatboxViewModel {
  private analyticsHandler: AnalyticsHandler;

  constructor() {
    this.analyticsHandler = new AnalyticsHandler();
  }

  trackChatboxOpened(): void {
    this.analyticsHandler.trackChatboxOpened();
  }

  trackChatboxClosed(): void {
    this.analyticsHandler.trackChatboxClosed();
  }
}

export default ChatboxViewModel;
