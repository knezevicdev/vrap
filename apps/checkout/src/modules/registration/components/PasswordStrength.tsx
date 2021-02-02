import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { passwordValidity } from '../validationSchema';

interface Props {
  passwordInput: string;
}

const INDICATOR_COLORS = ['#fc4349', '#ffd400', '#f26900', '#308406'];
const TRACK_COLOR = '#d6d7da';

const ProgressBar = styled.div<{ strength: number }>`
  height: 5px;
  background: ${({ strength }): string => {
    const indicatorColor = INDICATOR_COLORS[strength / 25 - 1];
    return `linear-gradient(to right, ${indicatorColor} ${strength}%, ${TRACK_COLOR} ${strength}%)`;
  }};
  width: 100%;
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

  return <ProgressBar strength={progress} />;
};

export default PasswordStrength;
