import {
  addStyleForDesktop,
  addStyleForMobile,
  addStyleForTablet,
  Button,
} from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import Spinner from '../../../../components/Spinner';
import CircleLoader from '../CircleLoader';
import ExactMileageInput from '../forminputs/ExactMileageInput';
import ExtColorInput from '../forminputs/ExtColorInput';
import LicenseInput from '../forminputs/LicenseInput';
import StateInput from '../forminputs/StateInput';
import TrimInput from '../forminputs/TrimInput';
import VehicleOptionsGroup from '../forminputs/VehicleOptionsGroup';
import ZipCodeInput from '../forminputs/ZipCodeInput';

export const LoadingSpinner = styled(Spinner)`
  margin-top: 5px;
`;

export const LeaseCopy = styled.div`
  padding-left: 8px;
  margin-top: 16px;
  margin-bottom: 32px;
  border-left: 2px #e7131a solid;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  font-family: Calibre-Semibold;
`;

export const InputContainer = styled.div`
  display: flex;
  text-align: left;
  margin-top: 10px;
  line-height: 18px;
  letter-spacing: 1px;
  font-size: 18px;
  font-family: Calibre-Regular;
  @media (max-width: 767px) {
    flex-direction: column;
    margin-bottom: 0px;
  }
`;

export const VinField = styled.div`
  width: 48%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const LicenseField = styled.div`
  display: flex;
  width: 48%;
  ${addStyleForMobile(`
    flex-direction: column;
    width: 100%;
  `)}
`;

export const License = styled.div`
  display: flex;
  width: 100%;
  ${addStyleForMobile(`
    width: 100%;
  `)}
`;

export const LicenseInputContainer = styled(LicenseInput)`
  width: 100%;
  margin-right: 15px;

  ${addStyleForMobile(`
    margin-right: 0;
  `)}
`;

export const States = styled(StateInput)`
  ${addStyleForTablet(`
    width: 90px;
  `)}

  ${addStyleForDesktop(`
    width: 160px;
  `)}

  ${addStyleForMobile(`
    margin-left: 0;
  `)}

  & select {
    padding: 10px;
  }
`;

export const Loader = styled(CircleLoader)`
  position: relative;
  margin: -5px 5px 5px 10px;
  @media (max-width: 767px) {
    top: 0;
  }
`;

export const SubmitButton = styled(({ ...restProps }) => (
  <Button.Primary {...restProps} />
))`
  :enabled {
    background-color: #E7131A;
    &:hover {
      background-color: #d01118
  }
  margin-top: 10px;
  width: 48%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const YearMakeModel = styled.div`
  width: 48%;
  font-weight: bold;
  // https://stackoverflow.com/questions/37534254/flex-auto-margin-not-working-in-ie10-11
  align-self: center;
  font-family: Calibre-Semibold;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 1px;
  margin: auto;

  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 21px;
  }
`;

export const SubmitError = styled.span`
  color: #e7131a;
  display: block;
  margin-top: 6px;
`;

export const TrimField = styled(TrimInput)`
  width: 48%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const ExactMileageField = styled(ExactMileageInput)`
  width: 48%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const ExteriorColorField = styled(ExtColorInput)`
  width: 48%;
  margin: 0 auto;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const VehicleOptionsField = styled(VehicleOptionsGroup)`
  width: 100%;
  padding-top: 10px;
`;

export const ZipCodeField = styled(ZipCodeInput)`
  width: 48%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const LoaderContainer = styled.span`
  display: inline;
  @media (max-width: 767px) {
    display: block;
    text-align: center;
    margin-top: 6px;
  }
`;
