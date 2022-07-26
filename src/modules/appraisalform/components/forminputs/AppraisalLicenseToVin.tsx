import React from 'react';
import styled from 'styled-components';

import LicenseStateInput from '../LicenseToVin/components/LicenseStateInput';
import {
  licensePlateTabText,
  vinTabText,
} from '../LicenseToVin/LicenseToVinMain.language';
import MultiTab from '../MultiTab/MultiTab';
import MultiTabTheme from '../MultiTab/styles/multiTabSlider';
import VinFormInput from './VinFormInput';

interface Props {
  vin: string;
  licenseForm: any;
  onLicensePlateKeyPressEnter: () => void;
  onVinKeyPressEnter: () => void;
  active?: number;
}

const AppraisalLicenseToVin: React.FC<Props> = ({
  vin,
  licenseForm,
  onVinKeyPressEnter,
  onLicensePlateKeyPressEnter,
  active,
}) => {
  const tabSections = [
    {
      component: LicenseStateInput,
      props: { licenseForm, onKeyPressEnter: onLicensePlateKeyPressEnter },
      title: licensePlateTabText,
    },
    {
      component: VinFormInput,
      props: { field: vin, onKeyPressEnter: onVinKeyPressEnter },
      title: vinTabText,
    },
  ];

  return (
    <AppraisalLicenseToVinContainer data-qa="AppraisalLicenseToVinComponent">
      <MultiTab
        tabSections={tabSections}
        theme={MultiTabTheme}
        active={active}
      />
    </AppraisalLicenseToVinContainer>
  );
};

const AppraisalLicenseToVinContainer = styled.div`
  width: 48%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export default AppraisalLicenseToVin;
