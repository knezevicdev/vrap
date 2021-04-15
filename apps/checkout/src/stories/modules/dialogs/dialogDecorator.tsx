import { Story } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

const DialogContainer = styled.div`
  width: 100%;
  max-width: 692px;
  background: #ffffff;
  box-shadow: 0px 4px 24px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 4px solid #e7131a;
`;

export const dialogDecorator = (Story: Story) => (
  <DialogContainer>
    <Story />
  </DialogContainer>
);
