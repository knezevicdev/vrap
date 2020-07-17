import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';

import Logo from 'src/components/Logo';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Logo />
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
