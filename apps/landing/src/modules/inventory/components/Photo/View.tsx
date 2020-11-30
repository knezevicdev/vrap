import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

export interface Props {
  viewModel: ViewModel;
}

const IframeContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 60.94%;
  background-color: #000000;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const Image = styled.img`
  max-width: 976px;
  max-height: 533px;
  width: 100%;
  object-fit: cover;
`;

const Photo: React.FC<Props> = ({ viewModel }) => {
  const spinCarUrl = viewModel.getSpinCarUrl();
  const { url, alt } = viewModel.getImageUrl();
  return (
    <>
      {!spinCarUrl ? (
        <Image src={url} alt={alt} />
      ) : (
        <IframeContainer>
          <Iframe src={spinCarUrl}></Iframe>
        </IframeContainer>
      )}
    </>
  );
};

export default observer(Photo);
