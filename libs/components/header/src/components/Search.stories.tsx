import React from 'react';

import Search from './Search';

export default { title: 'Search' };

const invSearchV3Url = 'https://invsearch-v3-qa-int.aws.vroomapi.com:8443/v3';

export const byItself: React.FC = () => {
  return (
    <>
      <p>
        This component is intended as a batteries-included header search,
        including an adaptive display for mobile versus desktop. If you need
        more granular control, see Autocomplete and AutocompleteDialog.
      </p>
      <Search invSearchV3Url={invSearchV3Url} />
    </>
  );
};
