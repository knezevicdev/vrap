import {
  Box,
  Collapse,
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import React, { useState } from 'react';

const PaddingTableCell = styled(TableCell)(({ theme }) => ({
  width: theme.spacing(5),
  padding: 0,
}));

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

interface Details {
  title: string;
  content?: string | JSX.Element | JSX.Element[];
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
      [Accessor.blackoutDates]?: JSX.Element[];
      [Accessor.bookedDate]?: string;
      [Accessor.cancelledDate]?: string;
      [Accessor.deliveredDate]?: string;
      [Accessor.destinationAddress]?: JSX.Element;
      [Accessor.estimatedDeliveryDate]?: string;
      [Accessor.estimatedPickupDate]?: string;
      [Accessor.originAddress]?: JSX.Element;
      [Accessor.pickedUpDate]?: string;
      [Accessor.postedDate]?: string;
      [Accessor.reason]?: string;
      [Accessor.actions]?: JSX.Element;
    };
    details?: Details[];
  }[];
}

const DetailsHeader = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 14,
  fontWeight: 600,
  textTransform: 'uppercase',
}));

const DetailsColumnTitle = styled('div')({
  fontSize: 14,
  fontWeight: 600,
});

const ArrowDropDownIcon = styled(ArrowDropDown)({
  position: 'absolute',
});

const HomeTable = ({ headers, rows }: TableData): JSX.Element => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const expand = (index: number): void => {
    if (index === expanded) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  return (
    <Paper square>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* if needed, an empty tablecell sits above the column that has icons to expand the row */}
              {rows[0]?.details && <PaddingTableCell />}
              {headers.map(({ display, accessor, sortBy }) => (
                <TableCell align="left" key={accessor}>
                  {display} {sortBy && <ArrowDropDownIcon />}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => [
              <TableRow key={0} hover>
                {row.details && (
                  <PaddingTableCell
                    align="right"
                    style={{ cursor: 'pointer' }}
                    onClick={(): void => expand(index)}
                  >
                    {expanded === index ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                  </PaddingTableCell>
                )}
                {headers.map(({ accessor }) => (
                  <TableCell align="left" key={accessor}>
                    {row.data[accessor]}
                  </TableCell>
                ))}
              </TableRow>,
              <TableRow key={1}>
                <PaddingTableCell />
                {row.details && (
                  <TableCell
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                    }}
                    colSpan={headers.length}
                  >
                    <Collapse
                      in={expanded === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box py={4}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <DetailsHeader>
                              Additional Information
                            </DetailsHeader>
                          </Grid>
                          {row.details.map((detail) => (
                            <Grid key={detail.title} item xs>
                              <DetailsColumnTitle>
                                {detail.title}
                              </DetailsColumnTitle>
                              {detail.content}
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                )}
              </TableRow>,
            ])}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default HomeTable;
