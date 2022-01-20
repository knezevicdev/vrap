import React from 'react';
import styled from 'styled-components';

import { STATES } from '../constants/misc';

/*** Intention of this file is to be an option generator for our new select boxes ***/

export function getOptions(typeOfSelect: string | undefined): any {
  switch (typeOfSelect) {
    case 'state':
      return getStateOptions();
    default:
      break;
  }
}

export function getCustomOptions(defaultLabel: any, options: any): any {
  return [
    <option key={defaultLabel} hidden>
      {defaultLabel}
    </option>,
  ].concat(
    options.map((opt: any) => {
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

function getStateOptions(): any {
  return [
    <option key={'state'} hidden>
      {'State'}
    </option>,
  ].concat(
    STATES.map((state: any) => {
      const { label, value } = state;

      return (
        <option key={label} value={value}>
          {label}
        </option>
      );
    })
  );
}
