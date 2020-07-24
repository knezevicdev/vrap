import Dialog from '@material-ui/core/Dialog';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const ViewContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  textAlign: 'center',
  padding: theme.spacing(4, 5),
}));

const Message = styled(Typography)(({ theme }) => ({
  fontFamily: 'SantanderHeadline, Arial, sans-serif',
  fontSize: '36px',
  lineHeight: '40px',
  margin: theme.spacing(5, 0, 4, 0),
  [theme.breakpoints.only('xs')]: {
    fontSize: '22px',
    lineHeight: '32px',
    fontWeight: 600,
    margin: theme.spacing(4, 0, 2, 0),
  },
  [theme.breakpoints.only('sm')]: {
    fontSize: '30px',
    margin: theme.spacing(4, 0, 2, 0),
  },
}));

const Seconds = styled(Typography)(({ theme }) => ({
  color: '#767676',
  fontFamily: 'SantanderHeadline, Arial, sans-serif',
  fontSize: '24px',
  lineHeight: '40px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
    lineHeight: '24px',
  },
  '& #seconds': {
    fontWeight: 600,
  },
}));

const Image = styled('img')(() => ({
  width: '100%',
  maxWidth: '588px',
}));

const View: React.FC<Props> = (props) => {
  const { viewModel } = props;

  return (
    <Dialog fullScreen open={true}>
      <ViewContainer>
        <Image src={viewModel.image.src} alt={viewModel.image.alt} />
        <Message>{viewModel.message}</Message>
        <Seconds>
          {viewModel.begin}
          <span id="seconds">{viewModel.getSecondsLeft()}</span>
          {viewModel.end}
        </Seconds>
      </ViewContainer>
    </Dialog>
  );
};

export default observer(View);
