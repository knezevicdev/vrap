import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ExternalLink from 'src/ui/ExternalLink';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Performance = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(3, 0, 0, 0),
  [theme.breakpoints.only('sm')]: {
    minWidth: `calc(50% - ${theme.spacing(2)}px)`,
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '14px',
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
  fontSize: '20px',
  minWidth: '155px',
  color: theme.palette.grey['700'],
  marginBottom: theme.spacing(2),
}));

const Value = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  whiteSpace: 'nowrap',
  letterSpacing: '0.75px',
  lineHeight: 'normal',
  [theme.breakpoints.only('xs')]: {
    whiteSpace: 'normal',
  },
}));

const RecallLink = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  marginTop: theme.spacing(2),
}));

const View: React.FC<Props> = ({ viewModel }) => {
  const {
    title,
    items,
    recallLink: { href, text },
  } = viewModel.getInformation();
  return (
    <Performance>
      <Title>{title}</Title>
      {items.map((item) => {
        return (
          <DetailsRow key={`${item.label}-${item.value}`}>
            <Label>{item.label}</Label>
            <Value>{item.value}</Value>
          </DetailsRow>
        );
      })}
      <ExternalLink href={href} target="_blank">
        <RecallLink>{text}</RecallLink>
      </ExternalLink>
    </Performance>
  );
};

export default View;
