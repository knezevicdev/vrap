import Box from '@material-ui/core/Box';
import React from 'react';

const NavigationView: React.FC = () => {
  const label = `© ${new Date().getFullYear()} VROOM. ALL RIGHTS RESERVED.`;
  return (
    <Box
      fontSize={12}
      fontFamily="Calibre, Arial, sans-serif"
      color="text.secondary"
    >
      {label}
    </Box>
  );
};

export default NavigationView;
