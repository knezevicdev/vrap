import {
  Link,
  ThemeProps,
  Typography,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import FooterViewModel from './ViewModel';

interface Props {
  viewModel: FooterViewModel;
}

const Footer: React.FC<Props> = ({ viewModel }) => {
  const { links, trackLink } = viewModel;
  return (
    <Container>
      <Information>
        <LinksContainer>
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={(): void => trackLink(link.text)}
            >
              <LinkText bold>{link.text.toUpperCase()}</LinkText>
            </Link>
          ))}
        </LinksContainer>
        <Copyright>{viewModel.copyRight}</Copyright>
      </Information>
    </Container>
  );
};

const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Container = styled.div`
  display: flex;
  background: ${primaryBlack};
  padding: 10px;
  height: 72px;
  align-items: center;
  justify-content: center;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
`;

const Copyright = styled(Typography.Fine)`
  color: ${primaryWhite};
  text-align: center;
  padding-top: 8px;
`;

const LinkText = styled(Typography.Body.Small)`
  color: ${primaryWhite};
  margin-bottom: 8px;
  padding: 0px 12px 0px 12px;
  letter-spacing: 1.25px;
`;

const LinksContainer = styled.div`
  justify-content: space-around;
  display: flex;
  flex-direction: row;
`;

export default Footer;
