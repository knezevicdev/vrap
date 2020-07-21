import { ThemeProvider } from '@vroom-web/ui';
import React from 'react';
import SantanderHeader from "./Santander";

export default { title: 'Headers' };

export const Santander: React.FC = () => {
    return (
        <ThemeProvider>
            <SantanderHeader/>
        </ThemeProvider>
    );
};
