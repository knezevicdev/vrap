import React from 'react';
import styled from 'styled-components';

import {
  ABOUTUSOPTIONS,
  CONTACTOPTIONS,
  DOCUPLOADTYPE,
  EMPLOYMENTSTATUS,
  PREVEMPLOYMENTSTATUS,
  REASONFORVISIT,
  RETIREDEMPLOYMENTSTATUS,
  SECONDARYINCOME,
  SELLTIMINGOPTIONS,
  STATES,
} from '../../constants/misc';

/*** Intention of this file is to be an option generator for our new select boxes ***/

// TODO:
// Most of these select options can be converted into the generic getCustomOptions
export function getOptions(typeOfSelect, options, alreadyUploadedDoc) {
  switch (typeOfSelect) {
    case 'state':
      return getStateOptions();
    case 'tradeInState':
      return getStateOptions(true);
    case 'savedAddress':
      return getAddressOption(options);
    case 'employmentStatus':
      return getEmploymentStatusOptions(EMPLOYMENTSTATUS);
    case 'prevEmploymentStatus':
      return getEmploymentStatusOptions(PREVEMPLOYMENTSTATUS);
    case 'retiredEmploymentStatus':
      return getEmploymentStatusOptions(RETIREDEMPLOYMENTSTATUS);
    case 'secondaryIncome':
      return getSecondaryIncomeOptions(SECONDARYINCOME);
    case 'sellTiming':
      return getSellTimingOptions(SELLTIMINGOPTIONS);
    case 'docUpload':
      return getDocUploadType(DOCUPLOADTYPE, alreadyUploadedDoc);
    case 'contactUs':
      return getContactUsOptions(CONTACTOPTIONS);
    case 'reasonForVisit':
      return getreasonForVisit(REASONFORVISIT);
    case 'aboutUs':
      return getAboutUs(ABOUTUSOPTIONS);
    default:
      break;
  }
}

export function getCustomOptions(defaultLabel, options) {
  return [
    <option key={defaultLabel} defaultValue hidden>
      {defaultLabel}
    </option>,
  ].concat(
    options.map((opt) => {
      const { label, value } = opt;

      return (
        <Option key={label} value={value}>
          {label}
        </Option>
      );
    })
  );
}

const Option = styled.option`
  color: black;
`;

function getStateOptions(tradeIn = false) {
  return [
    <option key={'state'} defaultValue hidden>
      {tradeIn ? 'State of purchase' : 'State'}
    </option>,
  ].concat(
    STATES.map((state) => {
      const { label, value } = state;

      return (
        <option key={label} value={value}>
          {label}
        </option>
      );
    })
  );
}

function getAddressOption(savedAddresses) {
  const userHasAddressess = savedAddresses.length > 0;
  return [
    userHasAddressess &&
      savedAddresses.map((eachAddress, index) => {
        return (
          <option
            key={index}
            value={`${index}${generateAddressValue(eachAddress)}`}
          >
            {generateAddressValue(eachAddress)}
          </option>
        );
      }),
  ].concat(
    <option key={'new address'} value={'new address'}>
      {'Add new address'}
    </option>
  );
}

export const generateAddressValue = (addressObject) => {
  const {
    streetLine1 = '',
    streetLine2 = '',
    city = '',
    state = '',
    postCode = '',
  } = addressObject;
  return `${streetLine1} ${streetLine2} - ${city}, ${state} ${postCode}`;
};

function getEmploymentStatusOptions(employmentStatusOptions) {
  return [
    <option key={'employmentStatus'} defaultValue hidden>
      Employment Status
    </option>,
  ].concat(
    employmentStatusOptions.map((eStatus) => {
      const { label, value } = eStatus;

      return (
        <option key={label} value={value}>
          {label}
        </option>
      );
    })
  );
}

function getSecondaryIncomeOptions(secondaryIncomeOptions) {
  return [
    <option key={'secondaryIncome'} defaultValue>
      Source of income
    </option>,
  ].concat(
    secondaryIncomeOptions.map((eStatus) => {
      const { label, value } = eStatus;

      return (
        <option key={label} value={value}>
          {label}
        </option>
      );
    })
  );
}

function getSellTimingOptions(sellTimingOptions) {
  return [
    <option key={'sellTiming'} defaultValue>
      Sell timing
    </option>,
  ].concat(
    sellTimingOptions.map((eStatus) => {
      const { label, value } = eStatus;

      return (
        <option key={label} value={value}>
          {label}
        </option>
      );
    })
  );
}

function getContactUsOptions(contactOptions) {
  return [
    <option key={'contactType'} defaultValue hidden>
      What are you contacting us about?
    </option>,
  ].concat(
    contactOptions.map((type) => {
      const { label, value } = type;

      return (
        <option key={label} value={value}>
          {label}
        </option>
      );
    })
  );
}

function getDocUploadType(DOCUPLOADTYPE, alreadyUploadedDoc) {
  let dropdownList = DOCUPLOADTYPE;
  if (alreadyUploadedDoc) {
    dropdownList = DOCUPLOADTYPE.filter(
      (item) => alreadyUploadedDoc.indexOf(item.value) === -1
    );
  }
  return [
    <option key={'docType'} defaultValue>
      Document Type
    </option>,
  ].concat(
    dropdownList.map((type) => {
      const { label, value } = type;

      return (
        <option key={label} value={value}>
          {label}
        </option>
      );
    })
  );
}

function getreasonForVisit(optionList) {
  return [
    <option key={'reasonVisit'} defaultValue>
      Reason to visit
    </option>,
  ].concat(
    optionList.map((eStatus) => {
      const { label, value } = eStatus;

      return (
        <option key={label} value={value}>
          {label}
        </option>
      );
    })
  );
}

function getAboutUs(optionList) {
  return [
    <option key={'aboutUs'} defaultValue>
      Choose an option
    </option>,
  ].concat(
    optionList.map((eStatus) => {
      const { label, value } = eStatus;

      return (
        <option key={label} value={value}>
          {label}
        </option>
      );
    })
  );
}
