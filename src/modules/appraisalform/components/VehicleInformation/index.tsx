import { useABSmartly } from '@vroom-web/analytics-integration';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';

import VehicleInformationView from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

interface Props {
  form: any;
  fields: any;
  hideButtonCallback: (hide: boolean) => void;
}

const VehicleInformation: React.FC<Props> = ({
  form,
  fields,
  hideButtonCallback,
}) => {
  const { store } = useAppStore();
  const router = useRouter();
  const absmartly = useABSmartly();
  const viewModel = new ViewModel(store, router, absmartly);

  return (
    <VehicleInformationView
      form={form}
      fields={fields}
      viewModel={viewModel}
      hideButtonCallback={hideButtonCallback}
    />
  );
};

export default observer(VehicleInformation);
