import { Box, styled, Tab, Tabs, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import Table from './Table';
import ViewModel from './ViewModel';

// import ShipmentChanger from 'src/components/ShipmentChanger';

const BorderedTabs = styled(Tabs)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey.A100}`,
}));

interface Props {
  viewModel: ViewModel;
}

const Shipments: React.FC<Props> = ({ viewModel }) => {
  const [value, setValue] = useState(0);

  const handleNav = (
    _e: React.SyntheticEvent<EventTarget>,
    newValue: number
  ): void => {
    setValue(newValue);
    viewModel.setSelectedStatus(newValue);
  };

  useEffect(() => {
    viewModel.getShipments();
  }, [value, viewModel]);

  const { headers, rows } = viewModel.tabs[value].tableData;

  return (
    <Box m={12}>
      {/* <ShipmentChanger /> */}
      <Typography variant="h1">Header for everything</Typography>
      <BorderedTabs
        value={value}
        onChange={handleNav}
        variant="fullWidth"
        indicatorColor="primary"
      >
        {viewModel.tabs.map((tab) => (
          <Tab key={tab.display} label={tab.display} />
        ))}
      </BorderedTabs>
      {viewModel.loading ? (
        <div>Loading</div>
      ) : (
        <Table headers={headers} rows={rows} />
      )}
    </Box>
  );
};

export default observer(Shipments);
