import React, { useEffect } from 'react';

import DesktopView from './DesktopView';
import MobileView from './MobileView';
import NavStore from './store';
import ViewModel from './ViewModel';

interface Props {
  desktop: boolean;
}
export const Nav: React.FC<Props> = (props) => {
  const { desktop } = props;
  const store = new NavStore();
  const viewModel = new ViewModel(store);

  useEffect(() => {
    store.initClientSide();
    return (): void => {
      store.tearDownClientSide();
    };
  }, [store]);

  if (desktop) {
    return <DesktopView viewModel={viewModel} />;
  } else {
    return <MobileView viewModel={viewModel} />;
  }
};

export default Nav;
