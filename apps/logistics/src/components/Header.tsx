import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import React, { useRef, useState } from 'react';

import Logo from './Logo';

import { IdToken } from 'src/networking/models/Auth';
import theme from 'src/theme';

const Section = styled(Grid)({
  padding: theme.spacing(0, 6),
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

interface Props {
  idToken?: IdToken;
  handleLogout?(): void;
  title: string;
}

const ArrowDropDownIcon = styled(ArrowDropDown)({
  fill: theme.palette.primary.contrastText,
});

const Header: React.FC<Props> = (props) => {
  const { idToken, handleLogout, title } = props;

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
    >
      <Section container direction="row">
        <Grid item>
          <Logo />
          <Typography variant="h1">{title}</Typography>
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
            <Link color="inherit" href="/signin">
              Sign-In
            </Link>
          </Grid>
        )}
      </Section>
    </Box>
  );
};

export default Header;
