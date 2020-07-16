import {ThemeProvider} from '@vroom-web/ui';
import React from 'react';

import StandardFooter from './Vroom/assembled/StandardFooter';
import SantanderFooter from "./Santander";

export default {title: 'Footers'};

export const Vroom: React.FC = () => {
    return (
        <ThemeProvider>
            <StandardFooter/>
        </ThemeProvider>
    );
};

export const Santander: React.FC = () => {
    return (
        <ThemeProvider>
            <SantanderFooter/>
        </ThemeProvider>
    );
};
