import {
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import React from 'react';

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

export interface TableData {
  headers: {
    display: string;
    accessor: Accessor;
    sortBy?: boolean;
  }[];
  rows: {
    id: number;
    data: {
      [Accessor.vin]: string;
      [Accessor.yearMakeModel]: string;
      [Accessor.blackoutDates]?: string;
      [Accessor.bookedDate]?: string;
      [Accessor.cancelledDate]?: string;
      [Accessor.deliveredDate]?: string;
      [Accessor.destinationAddress]?: string;
      [Accessor.estimatedDeliveryDate]?: string;
      [Accessor.estimatedPickupDate]?: string;
      [Accessor.originAddress]?: string;
      [Accessor.pickedUpDate]?: string;
      [Accessor.postedDate]?: string;
      [Accessor.reason]?: string;
      [Accessor.actions]?: JSX.Element[];
    };
  }[];
}

export const ArrowDropDownIcon = styled(ArrowDropDown)({
  position: 'absolute',
});

const SimpleTable = ({ headers, rows }: TableData): JSX.Element => (
  <Paper square>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(({ display, accessor, sortBy }) => (
              <TableCell align="left" key={accessor}>
                {display} {sortBy && <ArrowDropDownIcon />}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              {headers.map(({ accessor }) => (
                <TableCell align="left" key={accessor}>
                  {accessor === Accessor.actions ? (
                    <Grid container spacing={1}>
                      {row.data[accessor]?.map((Button: JSX.Element) => (
                        <Grid item xs={6} key={Button.key}>
                          {Button}
                        </Grid>
                      )) ?? null}
                    </Grid>
                  ) : (
                    <>{row.data[accessor]}</>
                  )}
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
