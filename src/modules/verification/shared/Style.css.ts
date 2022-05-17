import styled from 'styled-components';

export const Contents = styled.div`
  display: flex;
  background-color: #f5f5f5;
  padding-top: 20px;
  min-height: calc(100vh - 130px);
  justify-content: center;
  @media (max-width: 420px) {
    margin: 0;
    width: 100%;
  }
  @media (max-width: 1020px) {
    padding-top: 0;
    width: 100%;
  }
`;

interface VerificationContainerProps {
  isHidden?: boolean;
}

export const VerificationContainer = styled.div<VerificationContainerProps>`
  display: flex;
  width: 100%;
  max-width: 1280px;
  justify-content: center;
  @media (max-width: 1020px) {
    flex-direction: column-reverse;
    justify-content: center;
  }

  ${({ isHidden }) => isHidden && `display: none;`}
`;

export const ReviewContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: flex-end;
  margin: 0 10px;
  @media (max-width: 1020px) {
    width: 100%;
    margin: 0;
  }
`;

export const OverviewContainer = styled.div`
  width: 30%;
  margin: 0 10px;
  @media (max-width: 1020px) {
    width: 100%;
    margin: 0;
  }
`;

export const StepperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0 0 10px;
  @media (max-width: 1020px) {
    margin-bottom: 20px;
  }
`;

export const StepperContainer = styled.div`
  width: 100%;
  max-width: 1080px;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  z-index: 99999;
`;
