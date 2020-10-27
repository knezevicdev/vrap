import React from 'react';
import ViewModel from './ViewModel';
import { styled, Link } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(5, 3),
}));

const ContainerContent = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1280px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  lineHeight: '32px',
  paddingBottom: theme.spacing(5),
  textAlign: 'center',
}));

const Info = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: 1,
  letterSpacing: '1.3px',
  textTransform: 'uppercase',
  marginLeft: theme.spacing(1),
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const LinkContent = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 6),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: theme.spacing(5),
  },
}));

const ConstactModule: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <Heading variant="h2">{viewModel.title}</Heading>
      <ContainerContent>
        {viewModel.links.map((item) => (
          <Link href={item.link}>
            <LinkContent>
              <img width={20} height={20} src={item.icon}></img>
              <Info>{item.text}</Info>
            </LinkContent>
          </Link>
        ))}
      </ContainerContent>
    </Container>
  );
};

export default ConstactModule;
