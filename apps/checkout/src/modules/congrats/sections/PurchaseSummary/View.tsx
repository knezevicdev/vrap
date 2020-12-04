import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const View: React.FC<Props> = () => {
  return <div>hello</div>;
};

export default View;
