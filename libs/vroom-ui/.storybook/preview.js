import {addDecorator} from '@storybook/react';
import React from 'react';
import {GlobalStyle, getVroomTheme} from "../src/foundation/themes/Vroom";
import {ThemeProvider} from "styled-components";
import { withPerformance } from 'storybook-addon-performance';

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    viewport: {
        viewports: {
            mobile: {
                name: 'Mobile',
                styles: {
                    width: '411px',
                    height: '100%'
                },
            },
        },
    },
    layout: 'fullscreen'
}

function withGlobalStyles(storyFn) {
    const theme = getVroomTheme();
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            {storyFn()}
        </ThemeProvider>
    );
}

addDecorator(withGlobalStyles);
addDecorator(withPerformance);