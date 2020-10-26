import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { styled, Theme, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@vroom-web/ui';
import React, { useState } from 'react';
import reactStringReplace from 'react-string-replace';

import { ReactComponent as InfoIcon } from './svg/Info.svg';
import ViewModel from './ViewModel';

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 350,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

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
  const [open, setOpen] = useState(false);
  const handleTooltipClose = (): void => {
    setOpen(false);
  };
  const handleTooltipOpen = (): void => {
    setOpen(true);
  };
  return (
    <>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <HtmlTooltip
          disableFocusListener
          disableHoverListener
          disableTouchListener
          placement="left"
          open={open}
          onClose={handleTooltipClose}
          title={
            <>
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
            </>
          }
        >
          <PriceContainer onClick={handleTooltipOpen}>
            <Price>
              ${viewModel.price}
              <StyledInfoIcon />
            </Price>
          </PriceContainer>
        </HtmlTooltip>
      </ClickAwayListener>
    </>
  );
};

export default PriceView;
