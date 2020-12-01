import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import FilterListIcon from '@material-ui/icons/FilterList';
import React, { useState } from 'react';

import CarrierFilter from './Carrier';
import UserStatusFilter from './UserStatus';

const Filters: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLButtonElement)
  >(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => setAnchorEl(event.currentTarget);

  const handleClose = (): void => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const anchorId = open ? 'filter-popover' : undefined;
  return (
    <>
      <IconButton onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
      <Popover
        id={anchorId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              Filters
            </Grid>
            <Grid item xs={12}>
              <CarrierFilter />
            </Grid>
            <Grid item xs={12}>
              <UserStatusFilter />
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </>
  );
};

export default Filters;
