import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel, { Accessor } from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const UsersTableView: React.FC<Props> = ({ viewModel }) => {
  const handleChange = (
    id: number,
    status?: string,
    carrierCode?: string
  ): void => {
    viewModel.patchUser(id, status, carrierCode);
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
                <FormControl variant="outlined" fullWidth>
                  <Select
                    fullWidth
                    value={row.data[Accessor.carrier].carrier_code}
                    onChange={(event): void =>
                      handleChange(
                        row.id,
                        undefined,
                        event.target.value as string
                      )
                    }
                  >
                    {viewModel.carrierOptions.map((i) => (
                      <MenuItem key={i.key} value={i.key}>
                        {i.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="left">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default observer(UsersTableView);
