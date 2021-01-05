import { styled } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(9, 6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 3),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  letterSpacing: '1px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '42px',
    lineHeight: '46px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
    lineHeight: '32px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '28px',
    lineHeight: '32px',
  },
}));

const PartnerSection = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '32px',
  placeItems: 'center',
  [theme.breakpoints.only('xs')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

const Partner = styled('img')(() => ({
  width: '70%',
}));

const Description = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  letterSpacing: '0.25px',
  fontSize: '20px',
  lineHeight: '26px',
}));

const PartnersView: React.FC<Props> = ({ viewModel }) => {
  const { title, description, partners } = viewModel;
  return (
    <Container>
      <Title variant="h2">{title}</Title>
      <Description variant="body1">{description}</Description>
      <PartnerSection>
        {partners.map((partner) => (
          <Partner key={partner.key} src={partner.src} alt={partner.alt} />
        ))}
      </PartnerSection>
    </Container>
  );
};

export default PartnersView;
