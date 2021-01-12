import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import React from 'react';

import theme from 'src/theme';

export enum Accessor {
  vin,
  yearMakeModel,
  blackoutDates,
  bookedDate,
  cancelledDate,
  deliveredDate,
  destinationAddress,
  estimatedDeliveryDate,
  estimatedPickupDate,
  originAddress,
  pickedUpDate,
  postedDate,
  reason,
  actions,
}

interface Action {
  text: string;
  handler: () => void;
  primary?: boolean;
}

type SimpleField = string | number | boolean | Action;
type Field = SimpleField | SimpleField[] | undefined;

export interface TableData {
  headers: {
    display: string;
    accessor: Accessor;
    sortBy?: boolean;
  }[];
  rows: {
    id: string | number;
    link?: string;
    data: {
      [accessor in Accessor]?: Field;
    };
  }[];
}

const SlimTableCell = styled(TableCell)({
  padding: theme.spacing(2, 4),
});

const ArrowDropDownIcon = styled(ArrowDropDown)({
  position: 'absolute',
});

const ArrayCell = styled('div')({
  whiteSpace: 'nowrap',
});

const generateCell = (data: Field, key?: number): JSX.Element => {
  if (Array.isArray(data)) {
    return (
      <ArrayCell>{data.map((datum, i) => generateCell(datum, i))}</ArrayCell>
    );
  }
  if (typeof data === 'object') {
    return (
      <Button
        variant={data?.primary ? 'contained' : 'outlined'}
        color="primary"
        onClick={data.handler}
        key={key}
      >
        {data.text}
      </Button>
    );
  }

  return data ? (
    <span key={key}>
      {data.toString()}
      <br />
    </span>
  ) : (
    <></>
  );
};

const SimpleTable = ({ headers, rows }: TableData): JSX.Element => (
  <Paper square>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(({ display, accessor, sortBy }) => (
              <SlimTableCell align="center" key={accessor}>
                {display} {sortBy && <ArrowDropDownIcon />}
              </SlimTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              {headers.map(({ accessor }) => (
                <TableCell align="center" key={accessor}>
                  {generateCell(row.data[accessor])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

export default SimpleTable;
