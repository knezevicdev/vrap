import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const UsersView: React.FC<Props> = ({ viewModel }) => {
  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLButtonElement)
  >(null);
  const [carrierFilter, setCarrierFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    viewModel.getUsers();
  }, [viewModel]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => setAnchorEl(event.currentTarget);
  const handleClose = (): void => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const anchorId = open ? 'filter-popover' : undefined;

  const handleCarrierFilterChange = (value: string): void => {
    setCarrierFilter(value);
    viewModel.getUsers(value, statusFilter);
  };

  const handleStatusFilterChange = (value: string): void => {
    setStatusFilter(value);
    viewModel.getUsers(carrierFilter, value);
  };

  const { headers, rows } = viewModel.tableLayout;

  return (
    <Paper square>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h5">Users</Typography>
        </Grid>
        <Grid item>
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
                  <FormControl fullWidth>
                    <InputLabel id="filter-carrier-label">Carrier</InputLabel>
                    <Select
                      labelId="filter-carrier-label"
                      id="filter-carrier-select"
                      value={carrierFilter}
                      onChange={(event): void =>
                        handleCarrierFilterChange(event.target.value as string)
                      }
                    >
                      <MenuItem value={''}>--</MenuItem>
                      {viewModel.carriers.map((i) => (
                        <MenuItem key={i.carrierCode} value={i.carrierCode}>
                          {i.carrier}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="filter-carrier-label">Status</InputLabel>
                    <Select
                      labelId="filter-carrier-label"
                      id="filter-carrier-select"
                      fullWidth
                      value={statusFilter}
                      onChange={(event): void =>
                        handleStatusFilterChange(event.target.value as string)
                      }
                    >
                      <MenuItem value={''}>--</MenuItem>
                      {viewModel.statuses.map((i) => (
                        <MenuItem key={i.key} value={i.key}>
                          {i.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Popover>
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(({ display, accessor }) => (
                <TableCell align="left" key={accessor}>
                  {display}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                {headers.map(({ accessor }) => (
                  <TableCell align="left" key={accessor}>
                    {row.data[accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default observer(UsersView);
