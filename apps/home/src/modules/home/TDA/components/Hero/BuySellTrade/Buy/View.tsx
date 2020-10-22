import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Autocomplete from './Autocomplete';
import ViewModel from './ViewModel';

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
          color="primary"
        >
          {viewModel.resumeSearchButtonLabel}
        </ResumeSearch>
      )}
      {isMobile ? (
        <Browse
          fullWidth
          onClick={viewModel.handleButtonClick}
          variant={viewModel.showResumeSearch ? 'outlined' : 'contained'}
          color="primary"
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
        </>
      )}
    </BuyContainer>
  );
};

export default observer(BuyView);
