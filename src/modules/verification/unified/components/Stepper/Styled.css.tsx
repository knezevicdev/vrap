import styled from 'styled-components';

export const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProgressContainer = styled(Row)`
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 775px;
`;

export const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #979797;
  &.active {
    background-color: #e7131a;
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #979797;
  &.active {
    background-color: #e7131a;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  :first-child {
    width: 12px;
  }
`;

export const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextContainer = styled(Row)`
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
  margin-top: 8px;
  @media (max-width: 420px) {
    width: 90%;
  }
`;

export const StepTitle = styled.span`
  font-family: Calibre;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #979797;
  width: 145px;
  display: flex;
  justify-content: center;
  &:last-child {
    margin-right: 0;
  }
  &.active {
    color: #041022;
  }

  @media (max-width: 720px) {
    line-height: 16px;
    text-align: center;
    width: 130px;
    font-size: 14px;
  }

  @media (max-width: 452px) {
    width: 60px;
  }
`;
