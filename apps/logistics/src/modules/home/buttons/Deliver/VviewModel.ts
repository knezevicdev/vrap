import DeliverModel from './Model';
import { DeliverViewProps } from './View';

const DeliverViewModel = (model: DeliverModel): DeliverViewProps => ({
  handleDeliver: (date: string): void => {
    model.submitBook(date);
  },
});

export default DeliverViewModel;
