import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import { parseCookies } from 'nookies';

export interface ZenDeskData {
  subject: string;
}

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackContactFormSubmitted(zenDeskData: ZenDeskData): void {
    const cookies = parseCookies();
    const event = 'Contact Form Submitted';
    const category = 'Contact';
    const properties = {
      leadId: cookies.uuid,
      category,
      ...zenDeskData,
    };
    this.track(event, properties);
  }

  trackChatboxOpened(): void {
    const event = 'Conversation Started';
    const category = 'Pypestream Chatbot';
    const properties = { category };
    this.track(event, properties);
  }

  trackChatboxClosed(): void {
    const event = 'Conversation Ended';
    const category = 'Pypestream Chatbot';
    const properties = { category };
    this.track(event, properties);
  }
}

export default AnalyticsHandler;
