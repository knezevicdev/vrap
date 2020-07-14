import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const StyledImg = styled('img')(({ theme }) => ({
  width: '50%',
  height: '60vh',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  whiteSpace: 'normal',
  backgroundColor: theme.palette.background.paper,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  lineHeight: '1.3',
  textAlign: 'left',
  alignItems: 'center',
  padding: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 0),
  },
}));

interface Props {
  viewModel: ViewModel;
}

const ConditionEndView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <StyledBox>
        <Typography
          component="div"
          variant="body1"
          fontWeight="fontWeightLight"
        >
          {viewModel.bodyText}
          <ul>
            {viewModel.bullets.map((bullet: string) => {
              return <li key={bullet}>{bullet}</li>;
            })}
          </ul>
          {viewModel.faqPreText}
          <a
            href={viewModel.faqLink.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {viewModel.faqLink.text}
          </a>
        </Typography>
      </StyledBox>
      <StyledImg
        alt={viewModel.defaultImage.alt}
        src={viewModel.defaultImage.src}
      />
    </StyledContainer>
  );
};

export default ConditionEndView;
