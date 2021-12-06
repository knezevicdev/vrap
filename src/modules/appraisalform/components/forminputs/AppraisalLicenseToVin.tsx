import React from 'react';
import styled from 'styled-components';
import MultiTab from '@app/components/MultiTab/MultiTab';
import MultiTabTheme from '@app/components/MultiTab/styles/multiTabSlider';
import {
  licensePlateTabText,
  vinTabText
} from '@app/components/LicenseToVin/LicenseToVinMain.language';
import LicenseStateInput from '@app/components/LicenseToVin/components/LicenseStateInput';
import VinFormInput from '@app/components/Form/Inputs/VinFormInput';

const AppraisalLicenseToVin = ({ vin, vinLoader, handleUpdate, active }) => {
  const tabSections = [
    {
      component: LicenseStateInput,
      title: licensePlateTabText
    },
    {
      component: VinFormInput,
      props: { field: vin, vinLoader, handleUpdate },
      title: vinTabText
    }
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

  ${props => props.theme.media.mobile} {
    width: 100%;
  }
`;

export default AppraisalLicenseToVin;
