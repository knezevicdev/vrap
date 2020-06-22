import React from 'react';

import AutocompleteDialog from './AutocompleteDialog';

export default { title: 'AutocompleteDialog' };

const invSearchV3Url = 'https://invsearch-v3-qa-int.aws.vroomapi.com:8443/v3';

export const byItself: React.FC = () => {
  return (
    <>
      <p>
        This component is intended to provide autocomplete functionality for
        mobile/tablet only. If you are looking for a batteries-included header
        search component, see Search.
      </p>
      <AutocompleteDialog invSearchV3Url={invSearchV3Url} />
    </>
  );
};
