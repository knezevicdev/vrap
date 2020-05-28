import { observer } from 'mobx-react';
import React from 'react';

import { HeaderAutocompleteStore } from './store';
import HeaderAutocompleteView from './View';
import HeaderAutocompleteViewModel from './ViewModel';

const ObservingHeaderAutocompleteView = observer(HeaderAutocompleteView);

interface HeaderAutocompleteProps {
  classes?: object;
  afterNavigateUsingAutocomplete?: () => void;
  afterNavigateUsingSearch?: () => void;
}

const HeaderAutocomplete: React.FC<HeaderAutocompleteProps> = ({
  classes,
  afterNavigateUsingAutocomplete,
  afterNavigateUsingSearch,
}) => {
  const headerAutocompleteStore = new HeaderAutocompleteStore();
  const headerAutocompleteViewModel = new HeaderAutocompleteViewModel(
    headerAutocompleteStore
  );
  return (
    <ObservingHeaderAutocompleteView
      classes={classes}
      headerAutocompleteViewModel={headerAutocompleteViewModel}
      afterNavigateUsingAutocomplete={afterNavigateUsingAutocomplete}
      afterNavigateUsingSearch={afterNavigateUsingSearch}
    />
  );
};

export default HeaderAutocomplete;
