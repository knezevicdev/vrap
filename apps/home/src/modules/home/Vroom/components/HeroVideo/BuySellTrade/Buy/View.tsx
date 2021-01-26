import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Autocomplete from './Autocomplete';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

interface Props {
  viewModel: ViewModel;
}

const BuyContainer = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(1),
}));

const ResumeSearch = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Browse = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const BrowseText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.text.primary,
  fontSize: '18px',
  lineHeight: '24px',
  letterSpacing: '0.25px',
}));

interface Props {
  viewModel: ViewModel;
}

const BuyView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  React.useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);

  return (
    <BuyContainer>
      {viewModel.showResumeSearch && (
        <ResumeSearch
          fullWidth
          onClick={viewModel.handleResumeSearchButtonClick}
          variant="contained"
          color="secondary"
        >
          {viewModel.resumeSearchButtonLabel}
        </ResumeSearch>
      )}
      {isMobile ? (
        <Browse
          fullWidth
          onClick={viewModel.handleButtonClick}
          variant={viewModel.showResumeSearch ? 'outlined' : 'contained'}
          color="secondary"
        >
          {viewModel.mobileButtonLabel}
        </Browse>
      ) : (
        <>
          <Autocomplete
            buttonVariant={
              viewModel.showResumeSearch ? 'outlined' : 'contained'
            }
          />
          <ExternalLink underline="none" href={viewModel.link.href}>
            <BrowseText>{viewModel.link.label}</BrowseText>
          </ExternalLink>
        </>
      )}
    </BuyContainer>
  );
};

export default observer(BuyView);
