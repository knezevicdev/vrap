import { Box, Grid, styled, Tab, Tabs } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import Table from './Table';
import ViewModel from './ViewModel';

// import ShipmentChanger from 'src/components/ShipmentChanger';

const NavArrowLeft = styled(KeyboardArrowLeftIcon)(({ theme }) => ({
  cursor: 'pointer',
  height: theme.spacing(2),
  marginBottom: -3,
}));

const NavArrowRight = styled(KeyboardArrowRightIcon)(({ theme }) => ({
  cursor: 'pointer',
  height: theme.spacing(2),
  marginBottom: -3,
}));

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

  const total = viewModel.tabs[value].count;
  const from = Math.min(viewModel.offset + 1, total);
  const until = viewModel.offset + Math.min(viewModel.limit, total);
  const lastOffset = total - viewModel.limit;

  return (
    <Box mx={6} my={4}>
      <Grid direction="column" container spacing={2}>
        {/* <ShipmentChanger /> */}
        <Grid item style={{ textAlign: 'right' }}>
          {from} - {until} of {total}
          {viewModel.offset <= 0 || (
            <NavArrowLeft onClick={(): void => viewModel.prevPage()} />
          )}
          {viewModel.offset > lastOffset || (
            <NavArrowRight onClick={(): void => viewModel.nextPage()} />
          )}
        </Grid>
        <Grid item>
          <BorderedTabs
            value={value}
            onChange={handleNav}
            variant="fullWidth"
            indicatorColor="primary"
          >
            {viewModel.tabs.map((tab) => (
              <Tab key={tab.display} label={`${tab.display} (${tab.count})`} />
            ))}
          </BorderedTabs>
          {viewModel.loading ? (
            <div>Loading</div>
          ) : (
            <Table headers={headers} rows={rows} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default observer(Shipments);
