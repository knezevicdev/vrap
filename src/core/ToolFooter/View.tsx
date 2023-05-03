import { Icon, Link, Typography } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import FooterViewModel from './ViewModel';

import { Icons } from 'src/core/Icon';

const { Fine, Body } = Typography;

const Container = styled.div`
  display: flex;
  background: #041022;
  padding: 27px 0;
  @media (max-width: 599px) {
    flex-direction: column;
    padding: 24px;
  }
`;

const FooterBody = styled.div`
  margin: 0 auto;
`;

const Copyright = styled(Fine)`
  color: #ffffff;
  padding-left: 30px;
`;

const CustomA = styled.a`
  line-height: 0;
`;

const CustomLink = styled(Link.Text)`
  padding-left: 10px;

  :hover {
    text-decoration-color: red;
  }
`;

const LinkText = styled(Body.Small)`
  color: #ffffff;
  margin-bottom: 8px;
`;

interface Props {
  viewModel: FooterViewModel;
}

const FooterView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <FooterBody>
        <div>
          <CustomA href="https://www.vroom.com/">
            <Icon icon={Icons.VROOM_WHITE} />
          </CustomA>
          <Copyright>©2020 VROOM. ALL RIGHTS RESERVED.</Copyright>
          <CustomLink href="/legal/privacy-policy">
            <LinkText>Privacy Policy</LinkText>
          </CustomLink>
          <CustomLink href="/legal/terms-of-use">
            <LinkText>Terms of use</LinkText>
          </CustomLink>
          <CustomLink href={viewModel.phoneNumber.href}>
            <LinkText>{viewModel.phoneNumber.name}</LinkText>
          </CustomLink>
        </div>
      </FooterBody>
    </Container>
  );
};

export default FooterView;
