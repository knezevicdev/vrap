import { Select, SelectItem, SelectProps } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

interface DropdownProps extends SelectProps<SelectItem> {
  className: string;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  return (
    <State className={props.className}>
      <Select
        id={props.id}
        placeholder={props.placeholder}
        label={props.label}
        items={props.items}
        onSelectedItemChange={props.onSelectedItemChange}
        selectedItem={props.selectedItem}
      />
    </State>
  );
};

const State = styled.div`
  button {
    height: 40px;
    border: 1px solid #d6d7da;
  }
  /* 
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 40px;
  } */

  @media (max-width: 768px) {
    button {
      width: 70%;
    }
    width: 50%;
  }
`;

export default Dropdown;
