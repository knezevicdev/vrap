import React from 'react';
import styled from 'styled-components';

import HeaderViewModel from './ViewModel';
import {
  Icon,
  Icons,
  ThemeProps,
  Body,
  Link,
} from '@vroom-web/temp-ui-alias-for-checkout';

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;
const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  background: ${primaryWhite};
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 3;

  @media (max-width: 600px) {
    padding: 0 24px;
  }
`;

const VroomIcon = styled(Icon)`
  fill: ${primaryBlack};
`;

const StyledText = styled(Body.Small)`
  text-transform: uppercase;
  letter-spacing: 1.25px;
  margin-right: 8px;
`;

const PhoneNumber = styled(Body.Small)`
  @media (max-width: 1023px) {
    display: none;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  font-size: inherit;
  letter-spacing: inherit;
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const PhoneIcon = styled(Icon)`
  display: block;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const CartIcon = styled(Icon)`
  display: block;
  cursor: pointer;
`;

const CartWrapper = styled.div`
  margin-left: 32px;
  @media (min-width: 1024px) {
    display: none;
  }
`;

interface Props {
  viewModel: HeaderViewModel;
}

const HeaderView = ({ viewModel }: Props): JSX.Element => {
  const {
    logoHref,
    telephone: { text, href, number },
    handleClick,
  } = viewModel;

  return (
    <Container>
      <Link href={logoHref}>
        <VroomIcon icon={Icons.VROOM} />
      </Link>

      <RightColumn>
        <StyledText bold>{text}</StyledText>
        <CustomLink href={href}>
          <PhoneIcon icon={Icons.PHONE} />
          <PhoneNumber bold>{number}</PhoneNumber>
        </CustomLink>
        <CartWrapper onClick={handleClick}>
          <CartIcon icon={Icons.CART_FILLED} />
        </CartWrapper>
      </RightColumn>
    </Container>
  );
};

export default HeaderView;
