import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import Picture from '../Picture';

const Highlight = styled('div')(() => ({
  display: 'flex',
}));

const StyledImg = styled('img')(() => ({
  borderRadius: '50%',
  flexShrink: 0,
  width: '100px',
  height: '100px',
}));

const Text = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.25px',
  lineHeight: '1.3',
  marginBottom: theme.spacing(1),
}));

const Description = styled(Typography)(() => ({
  letterSpacing: '0.25px',
  lineHeight: '1.3',
}));

interface Props {
  description: string;
  imgAlt: string;
  imgSrc: string;
  title: string;
}

const HighlightView: React.FC<Props> = ({
  description,
  imgAlt,
  imgSrc,
  title,
}) => {
  return (
    <Highlight>
      <Picture src={imgSrc}>
        <StyledImg src={imgSrc} alt={imgAlt} />
      </Picture>
      <Text>
        <Title variant="body1">{title}</Title>
        <Description variant="body1">{description}</Description>
      </Text>
    </Highlight>
  );
};

export default HighlightView;
