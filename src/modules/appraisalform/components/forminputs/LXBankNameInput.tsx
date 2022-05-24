import { SelectChanges, SelectItem } from '@vroom-web/ui-lib';
import React, { useEffect, useRef, useState } from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import Input from '../Input';
import Select from '../Select';
import { FormFields } from './Inputs.language';

import { Caf } from 'src/networking/models/Price';
import { getCaf } from 'src/networking/request';

interface Props {
  field: FormField;
  className?: string;
}

const LXBankNameInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const [caf, setCaf] = useState<Caf[]>([]);
  const [selectedBankName, setSelectedBankName] = useState<string>('');
  const [customBankName, setCustomBankName] = useState<string>('');

  const lastCaf = useRef<string>();

  useEffect(() => {
    let isSubscribed = true;
    getCaf()
      .then((res) => {
        if (isSubscribed && 'data' in res) {
          setCaf(res.data.data);
        }
      })
      .catch((e) => console.log(e));

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    if (caf.length && lastCaf.current?.length !== caf.length && value) {
      const bank = caf.find((caf) => caf.lienholder_name === value);
      setSelectedBankName(bank ? bank.lienholder_name : 'Other');
      if (!bank) {
        setCustomBankName(value);
      }
    }
  }, [caf, field, onChange, value]);

  const handleSelectedBankChange = (changes: SelectChanges<SelectItem>) => {
    const value = changes.selectedItem?.value as string;
    setSelectedBankName(value);
    if (value === 'Other') {
      setCustomBankName('');
      onChange({ ...field, value: '' });
    } else {
      onChange({ ...field, value });
    }
  };

  const handleCustomBankNameChange = (event: GenericObject) => {
    const value = event.target.value;
    setCustomBankName(value);
    onChange({ ...field, value });
  };

  return (
    <>
      <Select
        field={{
          ...field,
          value: selectedBankName,
          label: FormFields.lXbankName.label,
          defaultLabel: FormFields.lXbankName.placeholder,
          options: [
            ...caf.map((caf) => ({
              label: caf.lienholder_name,
              value: caf.lienholder_name,
            })),
            {
              label: 'Other',
              value: 'Other',
            },
          ],
          onChange: handleSelectedBankChange,
        }}
      />
      {selectedBankName === 'Other' && (
        <Input
          field={{
            value: customBankName,
            onChange: handleCustomBankNameChange,
            label: FormFields.lienFinancialInstitutionName.label,
          }}
        />
      )}
    </>
  );
};

export default LXBankNameInput;
