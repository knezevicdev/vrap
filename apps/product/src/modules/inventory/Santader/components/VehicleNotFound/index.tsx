import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import { ReactComponent as NoVehiclesFoundIcon } from './no-results.svg';

interface Props {
  message: string;
}

const VehicleNotFoundContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(4, 0),
}));

const Message = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  marginTop: theme.spacing(3),
  [theme.breakpoints.only('xs')]: {
    whiteSpace: 'normal',
    lineHeight: 'normal',
  },
}));

const Icon = styled(NoVehiclesFoundIcon)(() => ({
  width: '64px',
}));

const VehicleNotFound: React.FC<Props> = ({ message }) => {
  return (
    <VehicleNotFoundContainer>
      <Icon />
      <Message variant="h2" textAlign="center">
        {message}
      </Message>
    </VehicleNotFoundContainer>
  );
};

export default VehicleNotFound;
