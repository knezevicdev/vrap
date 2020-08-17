import { addDecorator } from '@storybook/react';
import React from 'react';
import {GlobalStyle as VroomStyles } from "../src/themes/New/Vroom";
import {GlobalStyle as SantanderStyles } from "../src/themes/New/Santander";

function withGlobalStyles(storyFn) {
    return (
        <React.Fragment>
            <VroomStyles />
            <SantanderStyles/>
            {storyFn()}
        </React.Fragment>
    );
}

addDecorator(withGlobalStyles);