import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

export enum TrackProductSearchedLabel {
  AUTOCOMPLETE = 'Autocomplete',
  FREE_FORM = 'Free Form',
}

export enum TrackProductSearchedCategory {
  CATALOG = 'Catalog',
  PRODUCT = 'Product',
}

class AnalyticsHandler extends BaseAnalyticsHandler {
  private getTrackProductSearchedCategory():
    | TrackProductSearchedCategory
    | undefined {
    const { pathname } = window.location;
    if (pathname.startsWith('/cars')) {
      return TrackProductSearchedCategory.CATALOG;
    } else if (pathname.startsWith('/inventory')) {
      return TrackProductSearchedCategory.PRODUCT;
    } else {
      return undefined;
    }
  }

  trackProductSearched(label: TrackProductSearchedLabel, query: string): void {
    const event = 'Product Searched';
    const category = this.getTrackProductSearchedCategory();
    const properties = {
      category,
      label,
      query,
    };
    this.track(event, properties);
  }

  trackBuyClicked(): void {
    const event = 'Buy Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  }

  trackHomeClicked(): void {
    const event = 'Home Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  }

  trackSellTradeClicked(): void {
    const event = 'Sell/Trade Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  }

  trackFinanceClicked(): void {
    const event = 'Finance Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  }

  trackAboutUsClicked(): void {
    const event = 'About Us Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'About',
    };
    this.track(event, properties);
  }

  trackVroomProtectionClicked(): void {
    const event = 'Vroom Protection Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'About',
    };
    this.track(event, properties);
  }

  trackHowItWorksClicked(): void {
    const event = 'How It Works Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'About',
    };
    this.track(event, properties);
  }

  trackCustomerReviewsClicked(): void {
    const event = 'Customer Reviews Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'About',
    };
    this.track(event, properties);
  }

  trackInvestorRelationsClicked(): void {
    const event = 'Investor Relations Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'About',
    };
    this.track(event, properties);
  }

  trackFAQClicked(): void {
    const event = 'FAQ Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Contact',
    };
    this.track(event, properties);
  }

  trackPhoneClicked(): void {
    const event = 'Phone Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Contact',
    };
    this.track(event, properties);
  }

  trackContactUsClicked(): void {
    const event = 'Contact Us Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Contact',
    };
    this.track(event, properties);
  }

  trackLoginClicked(): void {
    const event = 'Login Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Account',
    };
    this.track(event, properties);
  }

  trackProfileClicked(): void {
    const event = 'Profile Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Account',
    };
    this.track(event, properties);
  }

  trackFavoritesClicked(): void {
    const event = 'Favorites Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Account',
    };
    this.track(event, properties);
  }

  trackTransactionsClicked(): void {
    const event = 'Transactions Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Account',
    };
    this.track(event, properties);
  }

  trackAddressesClicked(): void {
    const event = 'Addresses Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Account',
    };
    this.track(event, properties);
  }

  trackTransactionResumeClicked(): void {
    const event = 'Transaction Resume Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Account',
    };
    this.track(event, properties);
  }

  trackSignOutClicked(): void {
    const event = 'Sign Out Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Account',
    };
    this.track(event, properties);
  }

  trackFavoritesHeartClicked(): void {
    const event = 'Favorites Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  }
}

export default AnalyticsHandler;
