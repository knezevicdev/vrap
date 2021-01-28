import React, { useState, useEffect, FC } from 'react';
import { LinearProgress } from '@material-ui/core';
import { passwordValidity } from '../validationSchema';
import styled from 'styled-components';

interface Props {
  passwordInput: string;
}

const strength: { [key: number]: string } = {
  0: '#d6d7da',
  25: '#fc4349',
  50: '#ffd400',
  75: '#f26900',
  100: '#308406',
};

const ProgressBar = styled(LinearProgress)`
  .MuiLinearProgress-barColorPrimary {
    background-color: ${(props) => {
      const value = props.value || 0;
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
