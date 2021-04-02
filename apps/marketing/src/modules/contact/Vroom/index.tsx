import React from 'react';

const Vroom: React.FC = () => {
  return (
      <iframe
        src={'https://vroom-web.force.com/support/s/welcome'}
        style={{
          width: '100vw',
          height: '100vh',
        }}
        sandbox="allow-same-origin allow-scripts"
      />
  );
};

export default Vroom;
