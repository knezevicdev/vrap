import { useCallback, useState } from 'react';

import useForm from '../../useForm';
import { LocalState } from './useLocalState';

const useDecodeLicensePlate = (
  fields: any,
  resetLocalState: () => void,
  getVinDecode: (vehicleId: string, captchaToken: string) => Promise<any>,
  updateLocalState: (state: Partial<LocalState>) => void,
  setViewMode: (viewMode: 'vin') => void,
  extColors: Array<{ value: string; label: string }>,
  licenseForm: ReturnType<typeof useForm>,
  updateField: (
    state: string,
    license: string,
    errorMessage: string
  ) => {
    licensePlate: {
      value: string;
      errorMessage: string;
    };
    state: {
      value: string;
    };
  }
) => {
  const [isLoading, setIsLoading] = useState(false);

  const decodeLicensePlate = useCallback(
    (lpToDecode: string, captchaToken: string) => {
      const { vin } = fields;
      const errorMessage = 'Please enter a valid license plate number';

      resetLocalState();

      setIsLoading(true);

      getVinDecode(lpToDecode, captchaToken)
        .then((response) => {
          const {
            year,
            make,
            model,
            alternatives,
            features,
            exteriorColor,
            trim,
            subTrim,
            style,
          } = response;
          const trimsArr = [];
          const isError = Object.hasOwnProperty.bind(response)('error');
          if (isError) {
            setIsLoading(false);
            licenseForm.updateMultipleFields({
              licensePlate: {
                ...licenseForm.fields.licensePlate,
                error: true,
                errorMessage,
              },
            });
            return;
          } else {
            setViewMode('vin');
            const successFieldsToUpdate = updateField('', '', errorMessage);
            licenseForm.updateMultipleFields(successFieldsToUpdate);
            vin.onChange({
              ...vin,
              value: response.vin.toUpperCase(),
              error: false,
              errorMessage,
            });
          }
          const csExtColor = { label: exteriorColor, value: exteriorColor };

          const foundColor = extColors.find(
            (color) => color.value === exteriorColor
          );

          const updatedLocalState: Partial<LocalState> = {};

          if (!foundColor && exteriorColor !== null) {
            updatedLocalState.extColors = [csExtColor, ...extColors];
          }

          if (alternatives.length > 1) {
            alternatives.forEach((t: any) => {
              trimsArr.push({
                ...t,
                label: t.trim,
                value: t.trim,
                trimId: t.id,
              });
            });
          } else if (style) {
            trimsArr.push({ label: style, value: style });
          } else if (trim || subTrim) {
            const concatTrim = `${trim || ''} ${subTrim || ''}`.trim();
            trimsArr.push({ label: concatTrim, value: concatTrim });
          }

          if (alternatives.length === 0 && features.length) {
            updatedLocalState.options = [...features];
          }

          updateLocalState({
            ...updatedLocalState,
            year,
            make,
            model,
            selectedExtColor: csExtColor,
            trims: [...trimsArr],
            showOptionsGroup: features.length > 0,
            vinDecoded: true,
          });
        })
        .catch((e) => {
          console.log(e);
          resetLocalState();
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  return {
    isLoading,
    decodeLicensePlate,
  };
};

export default useDecodeLicensePlate;
