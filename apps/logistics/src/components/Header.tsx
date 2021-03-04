import {
  Box,
  Grid,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

import Logo from './Logo';

import { Groups, IdToken } from 'src/networking/models/Auth';

interface Props {
  idToken?: IdToken;
  handleLogout?(): void;
  title: string;
}

const ArrowDropDownIcon = styled(ArrowDropDown)(({ theme }) => ({
  fill: theme.palette.primary.contrastText,
}));

const Header: React.FC<Props> = (props) => {
  const { idToken, handleLogout, title } = props;

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const openMenu: () => void = () => {
    setOpen(true);
  };

  const closeMenu: () => void = () => {
    setOpen(false);
  };

  return (
    <Box
      height={theme.spacing(11)}
      display="flex"
      bgcolor="primary.main"
      color="primary.contrastText"
      py={{ xs: 1, sm: 4 }}
      px={6}
    >
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Logo />
          <Typography variant="h1">{title}</Typography>
        </Grid>
        <Grid item>
          {idToken ? (
            <Grid item>
              <Typography variant="body1" component="span">
                {idToken.name}
              </Typography>
              <IconButton ref={anchorRef} onClick={openMenu}>
                <ArrowDropDownIcon />
              </IconButton>
              <Menu
                anchorEl={anchorRef.current}
                keepMounted
                onClose={closeMenu}
                open={open}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                getContentAnchorEl={null}
              >
                {idToken['cognito:groups'].includes(
                  Groups.LogisticsPortalAdmin
                ) && (
                  <MenuItem>
                    <Link href="/admin/users" passHref>
                      <MuiLink>Admin - Users</MuiLink>
                    </Link>
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Grid>
          ) : (
            <Grid item>
              <Link href="/signin" passHref>
                <MuiLink color="inherit">Sign-In</MuiLink>
              </Link>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
