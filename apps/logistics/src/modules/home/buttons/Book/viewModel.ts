import BookModel from './Model';
import { BookViewProps } from './View';

const BookViewModel = (model: BookModel): BookViewProps => ({
  handleBook: (pickup, delivery, shippingCost): void => {
    const floated = parseFloat(shippingCost);
    model.submitBook(pickup, delivery, floated);
  },
});

export default BookViewModel;
