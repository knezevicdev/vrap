import { makeStyles } from '@material-ui/core/styles';
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

const tabStyle = makeStyles((theme) => ({
  root: {
    fontWeight: 600,
    fontSize: '16px',
    letterSpacing: '0.25px',
    color: theme.palette.grey['700'],
  },
  selected: {
    color: theme.palette.text.primary,
  },
}));

interface Props {
  viewModel: ViewModel;
}
const GallerySelectorView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const selected = viewModel.getSelectedGallery();
  const tabClass = tabStyle();

  return (
    <>
      <Tabs
        value={selected}
        onChange={viewModel.handleChange}
        aria-label="gallery selection tabs"
      >
        <Tab
          classes={tabClass}
          value={viewModel.general}
          label={viewModel.general.toUpperCase()}
          {...a11yProps(viewModel.general)}
        />
        <Tab
          classes={tabClass}
          value={viewModel.imperfections}
          label={viewModel.imperfections.toUpperCase()}
          {...a11yProps(viewModel.imperfections)}
        />
      </Tabs>
    </>
  );
};

export default observer(GallerySelectorView);
