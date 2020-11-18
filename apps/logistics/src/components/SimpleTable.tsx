import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

export interface TableData<S extends number | string> {
  headers: {
    display: string;
    accessor: S;
  }[];
  rows: {
    id: string | number;
    link?: string;
    data: {
      [accessor in S]: string | number | boolean;
    };
  }[];
}

const SimpleTable = <S extends number | string>({
  headers,
  rows,
}: TableData<S>): JSX.Element => (
  <Paper square>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(({ display, accessor }) => (
              <TableCell align="center" key={accessor}>
                {display}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              {headers.map(({ accessor }) => (
                <TableCell align="center" key={accessor}>
                  {row.link ? (
                    <Link href={row.link} target="_blank" rel="noopener">
                      {row.data[accessor]}
                    </Link>
                  ) : (
                    // toString makes sure jsx picks up boolean data and displays it
                    row.data[accessor].toString()
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
