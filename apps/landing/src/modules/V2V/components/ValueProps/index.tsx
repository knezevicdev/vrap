// import { Experiment } from '@vroom-web/experiment-sdk';
import React, { useEffect, useState } from 'react';

import View from './View';
import ViewModel from './ViewModel';

import experimentSDK from 'src/modules/integrations/experimentSDK';

const ValueProps: React.FC<{ sectionOrderKey: string | null }> = ({
  sectionOrderKey,
}) => {
  // first set order VIA prop, but if experiment exists re-render
  const [_sectionOrderKey, setSectionOrderKey] = useState<string | null>(
    sectionOrderKey
  );
  useEffect(() => {
    experimentSDK
      .getAndLogExperimentClientSide('delta-v2v-1')
      .then((experiment) => {
        if (experiment && experiment.assignedVariant === 1)
          setSectionOrderKey('delivery-only-exp');
      });
  }, []);

  return <View viewModel={new ViewModel(_sectionOrderKey)} />;
};

export default ValueProps;
