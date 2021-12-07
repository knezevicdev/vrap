import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MultiTab from '@app/components/MultiTab/MultiTab';
import MultiTabTheme from '@app/components/MultiTab/styles/multiTabBox';
import { licensePlateTabText, vinTabText } from './LicenseToVinMain.language';
import LicenseStateInput from './components/LicenseStateInput';
import VinInput from './components/VinInput';

const LicenseToVinMain = ({ className }) => {
  const tabSections = [
    {
      component: LicenseStateInput,
      title: licensePlateTabText
    },
    {
      component: VinInput,
      title: vinTabText
    }
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

LicenseToVinMain.propTypes = {
  className: PropTypes.string
};

const LicenseToVinMainContainer = styled.div`
  width: 100%;
`;

export default LicenseToVinMain;
