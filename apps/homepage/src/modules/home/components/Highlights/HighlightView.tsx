import Box from '@material-ui/core/Box';
import React from 'react';
import styled from 'styled-components';

import Typography from 'src/ui/Typography';

const StyledImg = styled.img`
  border-radius: 50%;
  flex-shrink: 0;
  width: 100px;
  height: 100px;
`;

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
    <Box display="flex">
      <StyledImg alt={imgAlt} src={imgSrc} />
      <Box ml={2}>
        <Box mb={2}>
          <Typography fontWeight="fontWeightMedium" variant="body1">
            {title}
          </Typography>
        </Box>
        <Typography
          fontWeight="fontWeightLight"
          lineHeight="1.5"
          variant="body1"
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default HighlightView;
