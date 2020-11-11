import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const StyledContainer = styled('div')(() => ({
  height: '100%',
  width: '100%',
}));

const Image = styled('img')(() => ({
  height: '100%',
  width: '100%',
}));

const DescriptionToolTip = styled('div')(() => ({
  background: 'rgba(0,0,0,.4)',
  bottom: '70px',
  color: '#fff',
  left: 0,
  lineHeight: 1,
  padding: '10px 20px',
  position: 'absolute',
  whiteSpace: 'normal',
  display: 'flex',
  textAlign: 'left',
  alignItems: 'center',
}));

const TextFlex = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}));

const Error = styled(ErrorIcon)(() => ({
  color: '#F5A622',
}));

const DescriptionView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <Image src={viewModel.image} />
      <DescriptionToolTip>
        <Error />
        <TextFlex>
          <Typography>Imperfection: {viewModel.description}</Typography>
          <Typography>This will not be repaired.</Typography>
        </TextFlex>
      </DescriptionToolTip>
    </StyledContainer>
  );
};

export default DescriptionView;
