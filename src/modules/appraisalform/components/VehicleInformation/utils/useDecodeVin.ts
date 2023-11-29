import { useCallback, useState } from 'react';

import { isValidVin, VROOM_VIN_SUBSTRING } from '../../validation';
import { LocalState } from './useLocalState';

const useDecodeVin = (
  fields: any,
  resetLocalState: () => void,
  getVinDecode: (vehicleId: string, captchaToken: string) => Promise<any>,
  updateLocalState: (state: Partial<LocalState>) => void,
  setViewMode: (viewMode: 'vin') => void,
  extColors: Array<{ value: string; label: string }>
) => {
  const [isLoading, setIsLoading] = useState(false);

  const decodeVin = useCallback(
    (vinToDecode: string, captchaToken: string) => {
      const isVinValid =
        vinToDecode.includes(VROOM_VIN_SUBSTRING) || isValidVin(vinToDecode);
      const errorMessage = 'Please enter a valid vin';
      const { vin } = fields;
      resetLocalState();

      setIsLoading(true);
      setViewMode('vin');

      if (isVinValid) {
        getVinDecode(vinToDecode, captchaToken)
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
            const isError = Object.hasOwnProperty.bind(response)('error');

            vin.onChange({
              ...vin,
              value: vinToDecode.toUpperCase(),
              validationError: isError,
              errorMessage,
            });

            if (isError) {
              return;
            }

            const trimsArr = [];
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
          .catch(() => {
            resetLocalState();
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        vin.onChange({
          ...vin,
          value: vinToDecode.toUpperCase(),
          validationError: !isVinValid,
          errorMessage,
        });
        resetLocalState();
        setIsLoading(false);
      }
    },
    [
      extColors,
      fields,
      getVinDecode,
      resetLocalState,
      setViewMode,
      updateLocalState,
    ]
  );

  return {
    isLoading,
    decodeVin,
  };
};

export default useDecodeVin;
