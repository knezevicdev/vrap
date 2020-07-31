import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Container, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

import Header from 'src/components/Header';

interface Props {
  viewModel: ViewModel;
}
const HomeView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const deliveryOrders = viewModel.getDeliveryOrders();
  const headers = viewModel.getHeaders();

  return (
    <>
      <Header />
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {headers.map(({ header }) => (
                  <TableCell align="right" key={header}>
                    <Typography variant="body1">{header}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveryOrders.map((row) => (
                <TableRow key={row.id}>
                  {headers.map(({ accessor }) => (
                    <TableCell align="right" key={accessor}>
                      <Link href={`deliveryorder/${row.id}`}>
                        <Typography variant="body1">{row[accessor]}</Typography>
                      </Link>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default observer(HomeView);
