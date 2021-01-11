import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import Autocomplete from './Carrier';
import ViewModel, { Accessor } from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const UsersTableView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    viewModel.getUsers();
  }, [viewModel]);

  const handleChange = (id: number, value: string): void => {
    viewModel.patchUser(id, value);
  };

  const { headers, rows } = viewModel.tableLayout;

  return (
    <Paper square>
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
              <TableCell align="left">{row.data[Accessor.name]}</TableCell>
              <TableCell align="left">{row.data[Accessor.email]}</TableCell>
              <TableCell align="left">
                <Autocomplete
                  userId={row.id}
                  carrierName={row.data[Accessor.carrier]}
                />
              </TableCell>
              <TableCell align="left">
                {viewModel.statusOptions.length > 0 && (
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      fullWidth
                      value={row.data[Accessor.status]}
                      onChange={(event): void =>
                        handleChange(row.id, event.target.value as string)
                      }
                    >
                      {viewModel.statusOptions.map((i) => (
                        <MenuItem key={i.key} value={i.key}>
                          {i.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default observer(UsersTableView);
