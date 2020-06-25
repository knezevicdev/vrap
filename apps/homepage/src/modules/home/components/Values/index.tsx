// import React from 'react';

// import View from './View';
// import ViewModel from './ViewModel';

// const Values: React.FC = () => {
//   const viewModel = new ViewModel();
//   return <View viewModel={viewModel} />;
// };

// export default Values;

import React from 'react';

import { HomeStore, HomeStoreContext } from '../../store';
import View from './View';
import ViewModel from './ViewModel';

const Values: React.FC = () => {
  return (
    <HomeStoreContext.Consumer>
      {(store: HomeStore): JSX.Element => {
        const viewModel = new ViewModel(store);
        return <View viewModel={viewModel} />;
      }}
    </HomeStoreContext.Consumer>
  );
};

export default Values;
