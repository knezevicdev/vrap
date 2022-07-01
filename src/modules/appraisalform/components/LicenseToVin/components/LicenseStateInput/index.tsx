import React from 'react';

import LicenseStateInput from './LicenseStateInput';

interface Props {
  licenseForm: any;
  onKeyPressEnter: () => void;
}

const LicenseToVin: React.FC<Props> = ({ licenseForm, onKeyPressEnter }) => {
  return (
    <LicenseStateInput
      licenseForm={licenseForm}
      onKeyPressEnter={onKeyPressEnter}
    />
  );
};

export default LicenseToVin;
