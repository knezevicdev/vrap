import { Link as MULink } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const ViewContainer = styled('div')(() => ({
  background: '#F1F1F1',
  zIndex: 1,
}));

const LinkContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  margin: '0 auto',
  maxWidth: '370px',
  padding: '16px 8px',
  justifyContent: 'space-between',
}));

const CustomLink = styled(MULink)(() => ({
  textDecoration: 'underline',
  textDecorationColor: '#767676',
  color: '#767676',
}));

const Text = styled(Typography)(() => ({
  color: '#767676',
  fontSize: '14px',
}));

const View: React.FC<Props> = ({ viewModel }) => {
  const { links, disclaimer } = viewModel;

  return (
    <ViewContainer>
      <LinkContainer>
        <Text>{disclaimer}</Text>
        {links.map((link) => {
          return (
            <CustomLink
              key={link.label}
              href={link.href}
              target={link.target}
              onClick={link.handleAnalytics}
            >
              <Text>{link.label}</Text>
            </CustomLink>
          );
        })}
      </LinkContainer>
    </ViewContainer>
  );
};

export default View;
