import React from 'react';
import { Story } from '@storybook/react';
import styled from "styled-components";

const DialogContainer = styled.div`
    width: 100%;
    max-width: 692px;
    background: #FFFFFF;
    box-shadow: 0px 4px 24px 4px rgba(0, 0, 0, 0.1);
    border-bottom: 4px solid #E7131A; 
`


export const dialogDecorator = (Story: Story) => <DialogContainer><Story/></DialogContainer>