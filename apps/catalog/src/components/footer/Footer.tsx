import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import React from 'react';

import FooterBar from './FooterBar';
import FooterCopyright from './FooterCopyright';
import FooterLogo from './FooterLogo';
import FooterNav from './FooterNav';

const Content = styled('div')(({ theme }) => ({
  width: '100%',
  borderBottom: `solid 1px ${theme.palette.grey['400']}`,
}));

const Footer: React.FC = () => {
  return (
    <FooterBar>
      <Content>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} lg={3}>
            <FooterLogo />
          </Grid>
          <Grid item xs={12} md={3}>
            <FooterNav />
          </Grid>
        </Grid>
      </Content>
      <FooterCopyright />
    </FooterBar>
  );
};

export default Footer;
