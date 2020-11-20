import {addDecorator} from '@storybook/react';
import React from 'react';
import {GlobalStyle, getTheme} from "../src/foundation/themes/Vroom";
import {ThemeProvider} from "styled-components";

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
}

function withGlobalStyles(storyFn) {
    const theme = getTheme('/assets');
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            {storyFn()}
        </ThemeProvider>
    );
}

addDecorator(withGlobalStyles);