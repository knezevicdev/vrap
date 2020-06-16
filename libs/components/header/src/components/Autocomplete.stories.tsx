import React from 'react';

import Autocomplete from './Autocomplete';

export default { title: 'Autocomplete' };

const invSearchV3Url = 'https://invsearch-v3-qa-int.aws.vroomapi.com:8443/v3';

export const byItself: React.FC = () => {
  return (
    <>
      <p>
        The autocomplete component is an unstyled component that handles the
        functionality of actually retrieving suggestions. If you are looking for
        a batteries-included header search component, see Search.
      </p>
      <Autocomplete invSearchV3Url={invSearchV3Url} />
    </>
  );
};
