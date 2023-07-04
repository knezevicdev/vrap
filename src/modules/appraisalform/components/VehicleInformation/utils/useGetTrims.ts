import { useCallback, useState } from 'react';

import { UseRecaptcha } from '../../../../../context/Recaptcha';
import { LocalState } from './useLocalState';

const useGetTrims = (
  recaptcha: UseRecaptcha,
  fields: any,
  isEditMode: boolean,
  updateLocalState: (state: Partial<LocalState>) => void,
  vehicleDecodeData: any,
  getTrimFeatures: (trimId: number, token: string | null) => Promise<any>
) => {
  const [isLoading, setIsLoading] = useState(false);

  const getTrims = useCallback(
    async (trimId: number) => {
      const { vehicleOptions } = fields;
      setIsLoading(true);

      if (trimId && !isEditMode) {
        const token = await recaptcha.getToken();
        const response = await getTrimFeatures(trimId, token);
        const trimOptions = response.features;
        const defaultSelected: any[] = [];
        trimOptions.forEach((opt: any) => {
          if (opt.selected) {
            defaultSelected.push(opt.name);
          }
        });

        vehicleOptions.onChange({
          ...vehicleOptions,
          value: defaultSelected,
        });
        updateLocalState({
          options: [...trimOptions],
          showOptionsGroup: trimOptions.length > 0,
        });
      } else if (vehicleDecodeData && vehicleDecodeData.features) {
        updateLocalState({
          options: [...vehicleDecodeData.features],
          showOptionsGroup: vehicleDecodeData.features.length > 0,
        });
      }
      setIsLoading(false);
    },
    [
      fields,
      getTrimFeatures,
      isEditMode,
      recaptcha,
      updateLocalState,
      vehicleDecodeData,
    ]
  );

  return {
    isLoading,
    getTrims,
  };
};

export default useGetTrims;
