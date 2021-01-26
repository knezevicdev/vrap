import { Box, ClickAwayListener, Tooltip } from '@material-ui/core';
import { styled, withStyles } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import { ReactComponent as InfoIcon } from 'public/components/info-icon.svg';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Banner = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  padding: theme.spacing(0, 2),
  width: 'fit-content',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  display: 'inline-flex',
  paddingLeft: theme.spacing(4),
  [theme.breakpoints.only('xs')]: {
    paddingLeft: theme.spacing(5, 4),
  },
  '&:after': {
    position: 'absolute',
    right: '-6px',
    top: '0',
    height: '24px',
    width: '20px',
    backgroundColor: 'inherit',
    transform: 'skewX(-23deg)',
    color: 'inherit',
    content: 'close-quote',
    quotes: 'none',
  },
}));

const Label = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '16px',
  letterSpacing: '1.25px',
  lineHeight: '24px',
}));

const StyledInfoIcon = styled(InfoIcon)(() => ({
  fill: '#ffffff',
  marginRight: 8,
  marginTop: 5,
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    border: 'solid 1px #C4C4C4',
    maxWidth: '400px',
  },
  arrow: {
    '&.MuiTooltip-arrow': {
      fontSize: 19,
      width: 20,
      '&::before': {
        border: '1px solid #C4C4C4',
        backgroundColor: '#fff',
        boxSizing: 'border-box',
      },
    },
  },
}))(Tooltip);

const ToolTipTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
}));

const ToolTipText = styled(Typography)(() => ({
  fontSize: '18px',
  lineHeight: '24px',
  paddingTop: '15px',
}));

const StatusBannerView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const bannerInfo = viewModel.getBanner();

  const tooltipConent = (
    <Box py={2} px={1}>
      <ToolTipTitle>{bannerInfo?.tooltipTitle}</ToolTipTitle>
      <ToolTipText>
        {bannerInfo?.tooltipText1}
        <strong>{bannerInfo?.tooltipText1Bold}</strong>
      </ToolTipText>
      <ToolTipText>{bannerInfo?.tooltipText2}</ToolTipText>
      <ToolTipText>{bannerInfo?.tooltipText3}</ToolTipText>
    </Box>
  );

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = (): void => {
    setOpen(false);
  };

  const handleTooltipOpen = (): void => {
    setOpen(true);
  };

  if (!bannerInfo) {
    return null;
  }
  return (
    <>
      {bannerInfo.id === 'ten-day-delivery' ? (
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <CustomTooltip
            onClick={handleTooltipOpen}
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={tooltipConent}
            placement="bottom-start"
            arrow
          >
            <Banner style={{ backgroundColor: bannerInfo.color }}>
              <StyledInfoIcon />
              <Label color={bannerInfo.font}>{bannerInfo.label}</Label>
            </Banner>
          </CustomTooltip>
        </ClickAwayListener>
      ) : (
        <Banner style={{ backgroundColor: bannerInfo.color }}>
          <Label color={bannerInfo.font}>{bannerInfo.label}</Label>
        </Banner>
      )}
    </>
  );
};

export default observer(StatusBannerView);
