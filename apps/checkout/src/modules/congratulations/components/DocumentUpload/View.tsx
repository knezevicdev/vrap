import {
  addStyleForMobile,
  Body,
  Button,
  Heading,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import DocumentUploadViewModel from './ViewModel';

interface Props {
  viewModel: DocumentUploadViewModel;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Description = styled(Body.Regular)`
  margin-top: 16px;
  text-align: center;
  white-space: pre-line;
`;

const StyledButton = styled(Button.Primary)`
  margin-top: 64px;
  ${addStyleForMobile(`
        margin-top: 32px;
   `)}
`;

const DocumentUploadView = ({ viewModel }: Props): JSX.Element => {
  const { title, description, label, handleClick } = viewModel;
  return (
    <Container>
      <Heading.Two>{title}</Heading.Two>
      <Description>{description}</Description>
      <StyledButton onClick={handleClick}>{label}</StyledButton>
    </Container>
  );
};

export default DocumentUploadView;
