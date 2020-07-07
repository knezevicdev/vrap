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
  [theme.breakpoints.only('xs')]: {
    margin: theme.spacing(6, 2),
  },
  marginTop: theme.spacing(4),
  '& .MuiPaginationItem-page.Mui-selected': {
    color: 'white',
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
      showFirstButton
      showLastButton
    />
  );
};

export default observer(PaginationView);
