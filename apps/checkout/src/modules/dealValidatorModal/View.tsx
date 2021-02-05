
import { ThemeProps, addStyleForMobile } from '@vroom-web/temp-ui-alias-for-checkout';
import { observer } from 'mobx-react-lite'; 
import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import DealValidatorModalViewModel from './ViewModel';

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;


const CustomModal = styled(Modal)`
  display: flex;
  position: relative;
  flex-direction: column;
  background: ${primaryWhite};
  max-width: 379px;
  max-height: 460px;
  border-bottom: solid 4px ${primaryBrand};
  outline: none;

  ${addStyleForMobile(`
    padding: 24px;
  `)}
`;

interface Props {
  viewModel: DealValidatorModalViewModel;
} 

const CongratsView: React.FC<Props> = ({ viewModel }) => { 

  const { isModalOpen } = viewModel;
 
  return ( 
       <CustomModal
          isOpen={isModalOpen} 
          contentLabel="Example Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(4, 16, 32, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px',
              zIndex: 1101, // Header is 1100
            },
          }}
        >

          <h2>Hello</h2> 
          <div>I am a modal</div>
          
        </CustomModal> 
  );
};

export default observer(CongratsView);
