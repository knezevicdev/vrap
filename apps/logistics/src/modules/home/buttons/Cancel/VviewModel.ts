import CancelModel from './Model';
import { CancelViewProps } from './View';

const CancelViewModel = (model: CancelModel): CancelViewProps => ({
  reasons: model.reasons,
  handleCancel: (reasonCode: string): void => {
    model.submitCancel(reasonCode);
  },
});

export default CancelViewModel;
