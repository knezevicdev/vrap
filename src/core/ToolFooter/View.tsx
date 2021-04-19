import React from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../../core/Icon';
import { Body, Link } from '../../core/Typography';
import FooterViewModel from './ViewModel';

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

const Copyright = styled(Body.Fine)`
  color: #ffffff;
  padding-left: 30px;
`;

const CustomA = styled.a`
  line-height: 0;
`;

const CustomLink = styled(Link)`
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
          <CustomA href={viewModel.vroomLink}>
            <Icon icon={Icons.VROOM} color="#FFFFFF" />
          </CustomA>
          <Copyright>{viewModel.copyrightMessage}</Copyright>
          <CustomLink href={viewModel.privacy.href}>
            <LinkText>{viewModel.privacy.name}</LinkText>
          </CustomLink>
          <CustomLink href={viewModel.terms.href}>
            <LinkText>{viewModel.terms.name}</LinkText>
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
