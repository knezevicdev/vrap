import React from 'react';
import styled from 'styled-components';

import MultiTab from '../MultiTab/MultiTab';
import MultiTabTheme from '../MultiTab/styles/multiTabBox';
import LicenseStateInput from './components/LicenseStateInput';
import VinInput from './components/VinInput';

interface Props {
  className: string;
}

const LicenseToVinMain: React.FC<Props> = ({ className }) => {
  const tabSections = [
    {
      component: LicenseStateInput,
      title: 'License Plate',
    },
    {
      component: VinInput,
      title: 'Vin',
    },
  ];

  return (
    <LicenseToVinMainContainer
      data-qa="LicenseToVinMainComponent"
      className={className}
    >
      <MultiTab tabSections={tabSections} theme={MultiTabTheme} />
    </LicenseToVinMainContainer>
  );
};

const LicenseToVinMainContainer = styled.div`
  width: 100%;
`;

export default LicenseToVinMain;
