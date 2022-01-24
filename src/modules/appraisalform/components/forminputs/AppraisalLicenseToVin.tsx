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
  vinLoader: boolean;
  handleUpdate: (vin: string) => void;
  active?: number;
}

const AppraisalLicenseToVin: React.FC<Props> = ({
  vin,
  vinLoader,
  handleUpdate,
  active,
}) => {
  const tabSections = [
    {
      component: LicenseStateInput,
      title: licensePlateTabText,
    },
    {
      component: VinFormInput,
      props: { field: vin, vinLoader, handleUpdate },
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
