import React from 'react';
import QuestionsViewModel from './ViewModel';
import Icon, { Icons } from 'src/core/Icon';

export interface Props {
  viewModel: QuestionsViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <>
      <div>{viewModel.questions}</div>
      <Icon icon={Icons.FAQ} />
      <Icon icon={Icons.EMAIL} />
      <Icon icon={Icons.PHONE} />
    </>
  );
};

export default View;
