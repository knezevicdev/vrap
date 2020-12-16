import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Icon, { Icons } from 'src/core/Icon';
import { Title } from 'src/core/Typography';

export interface Props {
  viewModel: ViewModel;
}

const IframeContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 60.94%;
  background-color: #000000;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

const Image = styled.img`
  max-width: 874px;
  max-height: 533px;

  width: 100%;
  object-fit: cover;
  background-color: #ffffff;
`;

const NoImageContainer = styled.div`
  max-width: 874px;
  height: 533px;
  width: 100%;
  background-color: #ffffff;
  display: grid;
  place-items: center;

  @media (max-width: 600px) {
    height: 232px;
  }
`;

const NoImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const NoImageIcon = styled(Icon)`
  @media (max-width: 840px) {
    height: 45px;
    width: 64px;
  }
`;

const NoImageText = styled(Title.One)`
  line-height: 40px;
  color: #999da3;

  @media (max-width: 840px) {
    line-height: 24px;
    font-size: 20px;
  }
`;

const Photo: React.FC<Props> = ({ viewModel }) => {
  const spinCarUrl = viewModel.getSpinCarUrl();
  const { url: imageUrl, alt } = viewModel.getImageUrl();

  if (!spinCarUrl) {
    if (!imageUrl)
      return (
        <NoImageContainer>
          <NoImageSection>
            <NoImageIcon icon={Icons.NO_IMAGES} color="#d6d7da" />
            <NoImageText>{viewModel.noImageText}</NoImageText>
          </NoImageSection>
        </NoImageContainer>
      );
    return <Image src={imageUrl} alt={alt} />;
  }

  return (
    <IframeContainer>
      <Iframe src={spinCarUrl} />
    </IframeContainer>
  );
};

export default observer(Photo);
