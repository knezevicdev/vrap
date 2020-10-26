import Popover from '@material-ui/core/Popover';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React, { useState } from 'react';
import reactStringReplace from 'react-string-replace';

import { ReactComponent as InfoIcon } from './svg/Info.svg';
import ViewModel from './ViewModel';

const PriceContainer = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  '& svg path': {
    fill: '#999DA3',
  },
  '& :hover svg path': {
    fill: theme.palette.primary.main,
  },
}));

const Price = styled(Typography)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
}));

const StyledInfoIcon = styled(InfoIcon)(({ theme }) => ({
  margin: theme.spacing(0, 1),
}));

interface Props {
  viewModel: ViewModel;
}

const PriceView: React.FC<Props> = ({ viewModel }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };
  return (
    <>
      <PriceContainer
        id="price_container"
        onClick={handleClick}
        aria-haspopup="true"
      >
        <Price>
          ${viewModel.price}
          <StyledInfoIcon />
        </Price>
      </PriceContainer>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Typography>{viewModel.title}</Typography>
        <Typography>
          {reactStringReplace(
            viewModel.list.header,
            /<bold>(.*)<\/bold>/,
            (match, i) => (
              <strong key={i}>{match}</strong>
            )
          )}
        </Typography>
        <ul>
          <Typography>
            {viewModel.list.bullets.map((item: string) => {
              return <li key={item}>{item}</li>;
            })}
          </Typography>
        </ul>
      </Popover>
    </>
  );
};

export default PriceView;
