import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@vroom-web/ui';
import React, { useState } from 'react';
import reactStringReplace from 'react-string-replace';

import { ReactComponent as InfoIcon } from './svg/Info.svg';
import ViewModel from './ViewModel';

const PriceContainer = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  '& svg path': {
    fill: '#999DA3',
  },
  '& :hover svg path': {
    fill: theme.palette.primary.main,
  },
}));

const Price = styled(Typography)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginLeft: theme.spacing(1),
}));

const StyledInfoIcon = styled(InfoIcon)(({ theme }) => ({
  margin: theme.spacing(0, 1),
}));

const Container = styled('div')(({ theme }) => ({
  width: '385px',
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

const PriceView: React.FC<Props> = ({ viewModel }) => {
  //Rather than create a store for tracking a single piece of state,
  //I thought this would be an approprite time to use local state diretly
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  return (
    <>
      <PriceContainer
        id="price_container"
        onClick={handleClick}
        aria-haspopup="true"
      >
        <Price>
          ${viewModel.price}
          <StyledInfoIcon />
        </Price>
      </PriceContainer>
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
              {viewModel.list.bullets.map((item: string) => {
                return <ListItem key={item}>{item}</ListItem>;
              })}
            </Typography>
          </List>
          <Typography>{viewModel.list.extra}</Typography>
        </Container>
      </Popover>
    </>
  );
};

export default PriceView;
