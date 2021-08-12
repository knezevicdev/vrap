import React, { useEffect, useState } from 'react';

import { useDirectDepositStore } from '../directdeposit/store';
import { useOptionsStore } from './store';
import View from './View';
import ViewAB from './ViewAB';
import ViewModel from './ViewModel';

const Options: React.FC = () => {
  const store = useOptionsStore();
  const ddStore = useDirectDepositStore();
  const viewModel = new ViewModel(store, ddStore);

  const [facelistTest, changeFaceliftTest] = useState(false);

  useEffect(() => {
    const test = viewModel.inFaceliftTest();
    changeFaceliftTest(test);
    store.setABSmartTest(test);
  }, []);

  return !facelistTest ? (
    <ViewAB viewModel={viewModel} />
  ) : (
    <View viewModel={viewModel} />
  );
};

export default Options;
