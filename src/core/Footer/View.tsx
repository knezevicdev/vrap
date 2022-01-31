import React from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../../core/Icon';
import { Body } from '../../core/Typography';
import { DesktopLinks } from './Desktop/Links';
import { MobileLinks } from './Mobile/Links';
import FooterViewModel from './ViewModel';

const Container = styled(({ ...restProps }) => <div {...restProps} />)`
  display: flex;
  background: #041022;
  padding: 48px 64px 32px 64px;
  ${(props): any => (props.hasOverlay === true ? 'padding-bottom: 180px' : '')};
  @media (max-width: 599px) {
    flex-direction: column;
    padding: 24px;
    ${(props): any =>
      props.hasOverlay === true ? 'padding-bottom: 180px' : ''};
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 599px) {
    order: 2;
  }
`;

const Apps = styled.div`
  display: flex;
`;

const Socials = styled.div`
  display: flex;
  margin: 16px 0;
`;

const IconSpaced = styled(Icon)`
  margin-right: 16px;
`;

const Message = styled(Body.Small)`
  color: #ffffff;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const Copyright = styled(Body.Fine)`
  color: #ffffff;
`;

const CustomA = styled.a`
  line-height: 0;
`;

interface Props {
  viewModel: FooterViewModel;
  hasOverlay: boolean;
}

const FooterView: React.FC<Props> = ({ viewModel, hasOverlay }) => {
  const { facebook, twitter, instagram } = viewModel.socialLinks;
  const { apple, google } = viewModel.appLinks;

  return (
    <Container hasOverlay={hasOverlay}>
      <Information>
        <CustomA href={viewModel.vroomLink}>
          <Icon icon={Icons.VROOM} color="#FFFFFF" />
        </CustomA>
        <Message>{viewModel.appMessage}</Message>
        <Apps>
          <CustomA href={google}>
            <IconSpaced icon={Icons.GOOGLE_PLAY} />
          </CustomA>
          <CustomA href={apple}>
            <Icon icon={Icons.APPLE_STORE} />
          </CustomA>
        </Apps>
        <Socials>
          <CustomA href={facebook}>
            <IconSpaced icon={Icons.FACEBOOK} />
          </CustomA>
          <CustomA href={twitter}>
            <IconSpaced icon={Icons.TWITTER} />
          </CustomA>
          <CustomA href={instagram}>
            <Icon icon={Icons.INSTAGRAM} />
          </CustomA>
        </Socials>
        <Copyright>{viewModel.copyrightMessage}</Copyright>
      </Information>
      <DesktopLinks sections={viewModel.sections} />
      <MobileLinks sections={viewModel.sections} />
    </Container>
  );
};

export default FooterView;
