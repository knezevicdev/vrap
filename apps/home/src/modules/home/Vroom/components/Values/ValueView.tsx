import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

const Value = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `solid 1px ${theme.palette.grey.A100}`,
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

const Type = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontWeight: 600,
  letterSpacing: '1.25px',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  fontWeight: 600,
  letterSpacing: '0.25px',
  lineHeight: '1.3',
}));

const Description = styled(Typography)(() => ({
  letterSpacing: '0.25px',
  lineHeight: '1.3',
}));

interface Props {
  type: string;
  title: string;
  description: string;
}

const ValueView: React.FC<Props> = ({ type, title, description }) => {
  return (
    <Value>
      <Type variant="caption">{type}</Type>
      <Title variant="body1">{title}</Title>
      <Description>{description}</Description>
    </Value>
  );
};

export default ValueView;
