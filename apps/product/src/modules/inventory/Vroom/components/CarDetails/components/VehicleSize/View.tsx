import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const VehicleSize = styled('div')(({ theme }) => ({
  width: '50%',
  display: 'flex',
  marginTop: theme.spacing(3),
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: { marginRight: 0, width: '100%' },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '1.75px',
  color: theme.palette.grey['500'],
  textTransform: 'uppercase',
}));

const DetailsRow = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  borderBottom: `1px solid rgba(214, 215, 218, 0.6)`,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(1),
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  minWidth: '190px',
  color: theme.palette.grey['700'],
  marginBottom: theme.spacing(2),
  [theme.breakpoints.only('sm')]: {
    minWidth: '50%',
  },
  [theme.breakpoints.only('xs')]: {
    minWidth: '140px',
  },
}));

const Value = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  letterSpacing: '0.75px',
  lineHeight: 'normal',
  [theme.breakpoints.only('xs')]: {
    whiteSpace: 'normal',
  },
}));

const View: React.FC<Props> = ({ viewModel }) => {
  const { title, items } = viewModel.getInformation();
  return (
    <VehicleSize>
      <Title>{title}</Title>
      {items.map((item) => {
        return (
          <DetailsRow key={`${item.label}-${item.value}`}>
            <Label>{item.label}</Label>
            <Value>{item.value}</Value>
          </DetailsRow>
        );
      })}
    </VehicleSize>
  );
};

export default View;
