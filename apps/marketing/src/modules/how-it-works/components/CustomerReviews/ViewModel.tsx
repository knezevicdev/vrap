import { sampleSize } from 'lodash';

import customerReviews from './reviews.json';
class CustomerReviewsViewModel {
  readonly title = 'what our customers are saying';

  reviews = () => sampleSize(customerReviews, 4);
}

export default CustomerReviewsViewModel;
