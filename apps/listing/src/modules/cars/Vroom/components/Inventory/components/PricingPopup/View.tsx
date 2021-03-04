import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import reactStringReplace from 'react-string-replace';

import { ReactComponent as InfoIcon } from './svg/Info.svg';
import ViewModel from './ViewModel';

const CtaWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(4),
  [theme.breakpoints.only('xs')]: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  '& :focus': {
    color: theme.palette.primary.main,
  },
}));

const CtaButton = styled('button')(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '0',
  border: 'none',
  background: 'none',
  outline: 'none',
  '& svg path': {
    fill: theme.palette.primary.main,
  },
  '& :hover': {
    color: theme.palette.primary.main,
  },
  '& :focus': {
    color: theme.palette.primary.main,
  },
}));

const CtaInfo = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
}));

const StyledInfoIcon = styled(InfoIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
  height: '18px',
  width: 'auto',
  [theme.breakpoints.down('sm')]: {
    height: '16px',
  },
}));

const Container = styled('div')(({ theme }) => ({
  maxWidth: '385px',
  padding: theme.spacing(3, 4),
  borderBottom: `5px solid ${theme.palette.primary.main}`,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: theme.spacing(2),
}));

const Header = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
}));

const List = styled('ul')(({ theme }) => ({
  listStylePosition: 'outside',
  paddingLeft: theme.spacing(2.5),
}));

const ListItem = styled('li')(({ theme }) => ({
  paddingBottom: theme.spacing(2),
}));

interface Props {
  viewModel: ViewModel;
}

const PricingPopupView: React.FC<Props> = ({ viewModel }) => {
  //Rather than create a store for tracking a single piece of state,
  //I thought this would be an appropriate time to use local state directly
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
    viewModel.trackToolTipClick();
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  if (!viewModel.showPricingPopup) {
    return null;
  }

  return (
    <div>
      <CtaWrapper>
        <CtaButton
          id="pricing_popup_cta_container"
          onClick={handleClick}
          aria-haspopup="true"
        >
          <CtaInfo>
            <StyledInfoIcon viewBox="0 0 20 20" />
            {viewModel.ctaText}
          </CtaInfo>
        </CtaButton>
      </CtaWrapper>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ square: true }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Container>
          <StyledIconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </StyledIconButton>
          <Header>
            <strong>{viewModel.title}</strong>
          </Header>
          <Typography>
            {reactStringReplace(
              viewModel.list.header,
              /<bold>(.*)<\/bold>/,
              (match, i) => (
                <strong key={i}>{match}</strong>
              )
            )}
          </Typography>
          <List>
            <Typography>
              {viewModel.getListBullets().map((item: string) => {
                return <ListItem key={item}>{item}</ListItem>;
              })}
            </Typography>
          </List>
          <Typography>{viewModel.list.extra}</Typography>
        </Container>
      </Popover>
    </div>
  );
};

export default observer(PricingPopupView);
