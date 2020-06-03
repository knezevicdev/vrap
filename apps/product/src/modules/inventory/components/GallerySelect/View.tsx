import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

function a11yProps(selected: string): object {
  return {
    id: `gallery-tab-${selected}`,
    'aria-controls': `gallery-tabpanel-${selected}`,
  };
}

interface Props {
  viewModel: ViewModel;
}
const GallerySelectorView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const selected = viewModel.getSelectedGallery();

  return (
    <>
      <Tabs
        value={selected}
        onChange={viewModel.handleChange}
        aria-label="gallery selection tabs"
      >
        <Tab
          value={viewModel.general}
          label={viewModel.general}
          {...a11yProps(viewModel.general)}
        />
        <Tab
          value={viewModel.imperfections}
          label={viewModel.imperfections}
          {...a11yProps(viewModel.imperfections)}
        />
        \
      </Tabs>
    </>
  );
};

export default observer(GallerySelectorView);
