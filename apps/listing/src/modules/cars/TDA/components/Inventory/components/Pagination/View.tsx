import { styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Pagination from '@material-ui/lab/Pagination';
import { observer } from 'mobx-react';
import React from 'react';

import PaginationViewModel from './ViewModel';

const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
  [theme.breakpoints.only('xs')]: {
    marginTop: theme.spacing(3),
    margin: theme.spacing(6),
  },

  '& .MuiPaginationItem-page.Mui-selected': {
    color: '#ffffff',
  },
  '& .MuiPagination-ul li:nth-last-child(2)': {
    display: 'none',
  },
}));

interface Props {
  viewModel: PaginationViewModel;
}

const PaginationView: React.FC<Props> = ({ viewModel }) => {
  const pageInfo = viewModel.getPageAndCount();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const onChange = (_event: object, page: number): void => {
    viewModel.onChange(page);
  };

  return (
    <StyledPagination
      color="secondary"
      size={isMobile ? 'small' : 'medium'}
      count={pageInfo.count}
      page={pageInfo.page}
      onChange={onChange}
    />
  );
};

export default observer(PaginationView);
