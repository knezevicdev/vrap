import { LinearProgress } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { passwordValidity } from '../validationSchema';

interface Props {
  passwordInput: string;
}

const strength = ['#d6d7da', '#fc4349', '#ffd400', '#f26900', '#308406'];

const ProgressBar = styled(LinearProgress)`
  .MuiLinearProgress-barColorPrimary {
    background-color: ${(props): string => {
      const value = props.value ? props.value / 25 : 0;
      return strength[value];
    }};
  }
`;

const PasswordStrength: FC<Props> = ({ passwordInput }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const validity = passwordValidity(passwordInput);
    const strength =
      Object.values(validity).filter((value) => value).length * 25;
    setProgress(strength);
  }, [passwordInput]);

  if (!progress) return null;

  return <ProgressBar variant="determinate" value={progress} />;
};

export default PasswordStrength;
