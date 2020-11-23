import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import ViewModel, { Accessor } from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const UsersView: React.FC<Props> = ({ viewModel }) => {
  // const [value, setValue] = useState<{ [number]: string }>({}); // useState(viewModel.storedValue);

  const handleChange = (id: number, value: string): void => {
    viewModel.patchUser(id, value);
  };

  useEffect(() => {
    viewModel.getUsers();
  }, [viewModel]);

  const { headers, rows } = viewModel.tableLayout;

  return (
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
              <TableCell align="left">{row.data[Accessor.firstName]}</TableCell>
              <TableCell align="left">{row.data[Accessor.lastName]}</TableCell>
              <TableCell align="left">{row.data[Accessor.email]}</TableCell>
              <TableCell align="left">{row.data[Accessor.carrier]}</TableCell>
              <TableCell align="left">
                {viewModel.statusOptions.length > 0 && (
                  <FormControl fullWidth>
                    <InputLabel id={`${row.id}-status-label`}>
                      Status
                    </InputLabel>
                    <Select
                      labelId={`${row.id}-status-label`}
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
    </TableContainer>
  );
};

export default observer(UsersView);
