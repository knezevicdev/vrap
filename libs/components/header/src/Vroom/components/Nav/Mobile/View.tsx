import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { styled, withStyles } from '@material-ui/core/styles';
import React from 'react';

import { ReactComponent as HamburgerSvg } from '../../../svg/hamburger.svg';
import DrawerContentView, {
  Links as DrawerContentViewLinks,
} from './DrawerContentView';

export type Links = DrawerContentViewLinks;

const StyledHamburgerSvg = styled(HamburgerSvg)(({ theme }) => ({
  width: '24px',
  height: '24px',
  cursor: 'pointer',
  color: theme.palette.secondary.main,
}));

const StyledDrawer = withStyles(() => ({
  paper: {
    minWidth: '250px',
  },
}))(Drawer);

interface Props {
  anchor?: 'bottom' | 'left' | 'right' | 'top';
  links?: Links;
  onClose?: () => void;
  onOpen?: () => void;
  open?: boolean;
}

const MobileView: React.FC<Props> = ({
  anchor = 'right',
  links,
  onClose,
  onOpen,
  open,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>(
    false
  );
  const handleMenuIconClick = (): void => {
    setUncontrolledOpen(true);
    if (onOpen) {
      onOpen();
    }
  };
  const handleDrawerClose = (): void => {
    setUncontrolledOpen(false);
    if (onClose) {
      onClose();
    }
  };
  const actualOpen = open ? open : uncontrolledOpen;
  return (
    <>
      <IconButton onClick={handleMenuIconClick}>
        <StyledHamburgerSvg />
      </IconButton>
      <StyledDrawer
        anchor={anchor}
        onClose={handleDrawerClose}
        open={actualOpen}
      >
        <DrawerContentView links={links} />
      </StyledDrawer>
    </>
  );
};

export default MobileView;
