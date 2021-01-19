import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import React, { useState } from 'react';

import Book from './popovers/Book';
import Cancel from './popovers/Cancel';
import Deliver from './popovers/Deliver';
import Pickup from './popovers/Pickup';

export enum Modals {
  book,
  cancel,
  deliver,
  pickup,
}

const Popovers = {
  [Modals.book]: <Book />,
  [Modals.cancel]: <Cancel />,
  [Modals.deliver]: <Deliver />,
  [Modals.pickup]: <Pickup />,
};

interface Props {
  primary?: boolean;
  popover: Modals;
  text: string;
  handler: () => void;
}

const PopoverButton = ({
  primary,
  popover,
  text,
  handler,
}: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  if (Popovers[popover]) {
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
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {Popovers[popover]}
        </Popover>
      </>
    );
  } else {
    return (
      <Button
        variant={primary ? 'contained' : 'outlined'}
        color="primary"
        onClick={handler}
      >
        {text}
      </Button>
    );
  }
};

export default PopoverButton;
