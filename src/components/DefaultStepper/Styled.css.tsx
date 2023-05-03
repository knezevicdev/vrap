import { CircularProgressbar } from 'react-circular-progressbar';
import styled from 'styled-components';

export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StepperProgress = styled(CircularProgressbar)`
  width: 42px;
  height: 42px;
`;

export const StepperText = styled.div`
  margin-left: 10px;
  margin-bottom: 5px;
`;

export const Title = styled.div`
  font-family: Calibre, sans-serif;
  font-size: 18px;
  letter-spacing: 0.25px;
  font-weight: 600;
  color: #041022;
`;

export const SubTitle = styled.div`
  width: 250px;
  height: 16px;
  font-family: Calibre, sans-serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: 0.35px;
  color: #6c717a;
`;
