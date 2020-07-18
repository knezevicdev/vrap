import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import Search from './Search';
import ViewModel from './ViewModel';
import globalEnv from "src/globalEnv";
import Link from "@material-ui/core/Link";


const ViewContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto', 4, 'auto'),
  width: '100%',
  backgroundImage: `url(${globalEnv.ASSET_PREFIX}/modules/home/santander/images/Santander-Hero@3x.jpg)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const ViewContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(8,2)
}));


const Title = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  whiteSpace: 'pre',
  lineHeight: '40px',
  fontSize: '48px',
  fontWeight: 600,
  fontFamily: 'SantanderHeadline',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.only('sm')]: {
    fontSize: '42px',
  },
  [theme.breakpoints.only('xs')]: {
    fontSize: '36px',
    marginBottom: theme.spacing(2),
  },
}));

const Browse = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  marginTop: theme.spacing(2),
  [theme.breakpoints.only('sm')]: {
    fontSize: '18px',
  },
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
    marginTop: theme.spacing(1),
  },
  '& > a': {
    color: '#FFFFFF',
  }
}));

interface Props {
  viewModel: ViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      <ViewContent>
        <Title>{viewModel.title}</Title>
        <Search />
        <Browse>
        <Link href={viewModel.browseLink.href}>{viewModel.browseLink.label}</Link>
        </Browse>
      </ViewContent>
    </ViewContainer>
  );
};

export default View;
