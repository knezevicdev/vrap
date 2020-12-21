import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { useRef, useState } from 'react';

import Logo from './Logo';

import { IdToken } from 'src/networking/models/Auth';

const useStyles = makeStyles(() => ({
  headerWrapper: {
    height: '95px',
    display: 'flex',
  },
  headerSection: {
    padding: '0 48px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

interface Props {
  idToken?: IdToken;
  handleLogout?(): void;
}

const Header: React.FC<Props> = (props) => {
  const { idToken, handleLogout } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const openMenu: () => void = () => {
    setOpen(true);
  };

  const closeMenu: () => void = () => {
    setOpen(false);
  };

  return (
    <div className={classes.headerWrapper}>
      <Grid container direction="row" className={classes.headerSection}>
        <Grid item>
          <Logo />
        </Grid>
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
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Grid>
        ) : (
          <Grid item>
            <Link href="/signin" variant="h6">
              Sign-In
            </Link>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Header;
