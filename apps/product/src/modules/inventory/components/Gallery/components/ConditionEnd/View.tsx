import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import React from 'react';

import ViewModel from './ViewModel';

import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

const StyledImg = styled('img')(({ theme }) => ({
  width: '50%',
  height: '60vh',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  whiteSpace: 'normal',
  backgroundColor: theme.palette.background.paper,
}));

const StyledTypography = styled(Typography)(() => ({}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  lineHeight: '1.3',
  textAlign: 'left',
  alignItems: 'center',
  padding: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

interface Props {
  viewModel: ViewModel;
}

const ConditionEndView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <StyledBox>
        <StyledTypography
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
        </StyledTypography>
      </StyledBox>
      <StyledImg
        alt={viewModel.defaultImage.alt}
        src={viewModel.defaultImage.src}
      />
    </StyledContainer>
  );
};

export default ConditionEndView;
