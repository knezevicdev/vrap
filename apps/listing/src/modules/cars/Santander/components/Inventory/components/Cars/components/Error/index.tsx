import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import { ReactComponent as NoVehiclesFoundIcon } from './no-results.svg';

interface Props {
  isError: boolean;
  message: string;
}

const ErrorContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(4, 0),
}));

const Message = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  marginTop: theme.spacing(3),
}));

const Icon = styled(NoVehiclesFoundIcon)(() => ({
  width: '64px',
}));

const Empty: React.FC<Props> = (props) => {
  const { message } = props;
  return (
    <ErrorContainer>
      <Icon />
      <Message fontWeight={600} textAlign="center">
        {message}
      </Message>
    </ErrorContainer>
  );
};

export default Empty;
