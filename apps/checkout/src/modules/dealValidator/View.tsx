import {
  addStyleForMobile,
  ThemeProps,
} from '@vroom-web/temp-ui-alias-for-checkout';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

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
  border-bottom: solid 4px ${primaryBrand};
  outline: none;

  ${addStyleForMobile(`
    padding: 24px;
  `)}
`;

interface Props {
  viewModel: DealValidatorModalViewModel;
}

const DealValidatorModalView: React.FC<Props> = ({ viewModel }) => {
  const onAfterOpen = (): void => {
    document.body.style.overflow = 'hidden';
  };

  const onAfterClose = (): void => {
    document.body.style.overflow = 'unset';
  };

  const { isModalOpen, ModalContent, dialogAction, carName } = viewModel;
  const { component, title, contentMsg, dialogType } = ModalContent || {};
  return (
    <CustomModal
      isOpen={isModalOpen}
      contentLabel={title}
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
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose}
    >
      {component &&
        React.createElement(component, {
          viewModel,
          title,
          contentMsg,
          dialogAction,
          carName,
          dialogType,
        })}
    </CustomModal>
  );
};

export default observer(DealValidatorModalView);
