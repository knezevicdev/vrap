import {
  Client,
  GQLTypes,
  isErrorResponse,
  Status,
} from '@vroom-web/networking';
import gql from 'graphql-tag';
import { makeAutoObservable, runInAction } from 'mobx';

interface Data {
  user: GQLTypes.User;
}

export default class CongratsModel {
  client: Client;
  data: Data = {} as Data;
  dataStatus: Status = Status.LOADING;

  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this);
  }

  async getData(dealID?: number): Promise<void> {
    this.dataStatus = Status.LOADING;

    const document = gql`
      query($dealID: Int, $dealStatus: [String!]) {
        user {
          username
          firstName
          lastName
          phones {
            number
          }
          appraisals {
            vehicle {
              year
              make
              model
            }
            appraisaloffer {
              price
            }
          }
          deals(dealID: $dealID, dealStatus: $dealStatus) {
            accountID
            dealID
            dealSummary {
              accountInfo {
                userName
                firstName
                middleName
                lastName
                phone
              }
              dealStatus {
                step
                status
                interestedInTrade
                canBeCancelled
                pastSteps
              }
              paymentType
              deliveryAddress {
                firstName
                lastName
                streetLine1
                streetLine2
                city
                state
                postCode
              }
              amountDue {
                subTotal
                totalBalanceDue
                cashDownPayment
                taxableAmount
                totalTaxesAndFees
                shippingFee
                tradeIn {
                  value
                  loanPayoff
                  netBalance
                  totalDownPayment
                }
              }
              dateCompleted
              deliveryDetails {
                wheelerTruck
                availableForDelivery
                additionalDetails
                unavailableDates
                alternateContact {
                  first
                  last
                  phone
                }
                wheelerTruck
              }
              documents {
                fileType
                fileID
              }
              inventory {
                id
                miles
                leadPhotoURL
                pricing {
                  listPrice
                }
                vehicle {
                  vin
                  year
                  make
                  model
                  trim
                }
              }
              depositPaymentInfo {
                HoldPlaced
                LastFourDigits
                ChargeAmount
              }
              registrationAddress {
                firstName
                lastName
                streetLine1
                streetLine2
                city
                state
                postCode
              }
              billingAddress {
                firstName
                lastName
                streetLine1
                streetLine2
                city
                state
                postCode
              }
              financing {
                decisions {
                  isAccepted
                }
                pricingStack {
                  downPayment
                  lenderName
                  apr
                  buyRate
                  termMonths
                  monthlyPayment
                  financeCharge
                }
              }
              additionalProducts
            }
          }
        }
      }
    `;

    const res = await this.client.gqlRequest<Data, GQLTypes.UserDealsArgs>({
      document,
      variables: {
        dealID,
        dealStatus: ['Pending'],
      },
    });

    if (isErrorResponse(res)) {
      runInAction(() => {
        this.dataStatus = Status.ERROR;
      });
      console.log('ERROR', res);
      return;
    }

    runInAction(() => {
      this.data = res.data;
      this.dataStatus = Status.SUCCESS;
    });
  }
}
