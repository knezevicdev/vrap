import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import React, { useState } from 'react';

interface Props {
  primary?: boolean;
  text: string;
}

const PopoverButton: React.FC<Props> = ({
  primary,
  text,
  children,
}): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant={primary ? 'contained' : 'outlined'}
        color="primary"
        onClick={handlePopoverOpen}
      >
        {text}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </Popover>
    </>
  );
};

export default PopoverButton;
