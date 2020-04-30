import React from 'react';

// import Typography from 'src/ui/Typography';

const NavigationView: React.FC = () => {
  const label = `© ${new Date().getFullYear()} VROOM. ALL RIGHTS RESERVED.`;
  return (
    // <Typography fontWeight="fontWeightLight" variant="overline">
    <div>{label}</div>
    // </Typography>
  );
};

export default NavigationView;
