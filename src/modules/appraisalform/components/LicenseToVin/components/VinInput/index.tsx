import { useRouter } from 'next/router';
import React from 'react';

import { selectTheme } from '../../../../store/theme/selectors';
// const mapStateToProps = (state) => {
//   return {
//     theme: selectTheme(state),
//   };
// };
import ViewModel from './ViewModel';
import View from './VinInput';

const VinInput: React.FC = () => {
  const router = useRouter();

  const viewModel = new ViewModel(router);
  return <View viewModel={viewModel} />;
};

export default VinInput;
