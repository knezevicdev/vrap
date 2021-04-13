import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class ChatboxViewModel {
  private analyticsHandler: AnalyticsHandler;

  constructor() {
    this.analyticsHandler = new AnalyticsHandler();
  }

  trackChatboxOpened = () => {
    this.analyticsHandler.trackChatboxOpened();
  };

  trackChatboxClosed = () => {
    this.analyticsHandler.trackChatboxClosed();
  };
}

export default ChatboxViewModel;
