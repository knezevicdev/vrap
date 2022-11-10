import { Checkbox, CheckboxProps } from '@vroom-web/ui-lib';
import React, { ReactElement } from 'react';

import { Description, Wrapper } from './Style.css';

type Props = CheckboxProps & {
  description?: string;
};

const StyledCheckbox = ({ description, ...props }: Props): ReactElement => {
  const checkboxChildren = description ? (
    <Description>{description}</Description>
  ) : undefined;

  return (
    <Wrapper checked={props.checked} hasDescription={!!description}>
      <Checkbox {...props}>{checkboxChildren}</Checkbox>
    </Wrapper>
  );
};

export default StyledCheckbox;
