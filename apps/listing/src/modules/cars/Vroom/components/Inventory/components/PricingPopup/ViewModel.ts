import { ExperimentSDK } from '@vroom-web/experiment-sdk';
import { Client, GQLTypes, isSuccessResponse } from '@vroom-web/networking';
import gql from 'graphql-tag';
import { action, observable } from 'mobx';
import getConfig from 'next/config';

import { analyticsHandler } from 'src/integrations/AnalyticsHandler';

interface List {
  header: string;
  extra: string;
}

interface DeliveryFeeData {
  taxiGetShippingFee: GQLTypes.ShippingFee;
}

const { publicRuntimeConfig } = getConfig();

class PricingPopupViewModel {
  private readonly deliveryFeeDefault: number = 699;
  deliveryFee: number = this.deliveryFeeDefault;
  readonly ctaText: string = 'Prices do not include all taxes and fees.';
  readonly title: string = 'Pricing';
  @observable showPricingPopup = false;
  readonly list: List = {
    header: 'Prices displayed <bold>do not</bold> include:',
    extra:
      'We make every effort to provide accurate vehicle information on this page, but please verify before purchasing.',
  };

  constructor() {
    const gearboxClient = new Client(publicRuntimeConfig.GEARBOX_URL, {
      timeout: 4000,
    });
    this.fetchDeliveryFeeState(gearboxClient, this.deliveryFeeDefault);

    new ExperimentSDK()
      .getAndLogExperimentClientSide('snd-catalog-show-pricing-popup')
      .then((experiment) => {
        if (experiment) {
          this.setShowPricingPopup(experiment.assignedVariant === 1);
          analyticsHandler.registerExperiment(experiment);
        }
      });
  }

  @action
  setShowPricingPopup(isVisible: boolean): void {
    this.showPricingPopup = isVisible;
  }

  async fetchDeliveryFeeState(
    gearboxClient: Client,
    deliveryFeeDefault: number
  ): Promise<void> {
    const response = await gearboxClient.gqlRequest<DeliveryFeeData>({
      document: gql`
        {
          taxiGetShippingFee {
            fee
          }
        }
      `,
    });
    if (isSuccessResponse(response)) {
      this.deliveryFee =
        response.data.taxiGetShippingFee.fee || deliveryFeeDefault;
    } else {
      console.error(JSON.stringify(response.error));
      this.deliveryFee = deliveryFeeDefault;
    }
  }

  getListBullets(): string[] {
    return [
      'Pre-delivery service charges of $285.50 (MA residents $385.50)',
      `Delivery fee of $${this.deliveryFee}`,
      'FL, NJ and NY residents only - Electronic registration filing charge of $15.00',
      'Applicable taxes, title, tag and registration charges which will be calculated at the time of purchase.',
    ];
  }

  trackToolTipClick(): void {
    analyticsHandler.trackPricingPopupClicked();
  }
}

export default PricingPopupViewModel;
