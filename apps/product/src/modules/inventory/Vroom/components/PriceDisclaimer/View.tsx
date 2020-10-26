import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Theme, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import reactStringReplace from 'react-string-replace';

import ViewModel from './ViewModel';

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

interface Props {
  viewModel: ViewModel;
}

const PriceDisclaimerView: React.FC<Props> = ({ viewModel }) => {
  const [open, setOpen] = useState(false);
  const handleTooltopClose = (): void => {
    setOpen(false);
  };
  const handleTooltopOpen = (): void => {
    setOpen(true);
  };
  return (
    <>
      <ClickAwayListener onClickAway={handleTooltopClose}>
        <HtmlTooltip
          disableFocusListener
          disableHoverListener
          disableTouchListener
          placement="left"
          open={open}
          onClose={handleTooltopClose}
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
          <Button onClick={handleTooltopOpen}>Price</Button>
        </HtmlTooltip>
      </ClickAwayListener>
    </>
  );
};

export default observer(PriceDisclaimerView);
