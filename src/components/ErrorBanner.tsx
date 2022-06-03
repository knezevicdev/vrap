import React from 'react';
import styled from 'styled-components';

interface Props {
  errorMessage?: string;
}

const ErrorBanner: React.FC<Props> = ({ errorMessage }) => {
  return (
    <Banner>
      <BannerText>{errorMessage}</BannerText>
    </Banner>
  );
};

ErrorBanner.defaultProps = {
  errorMessage: 'Oops! Something went wrong. Please try to submit again.',
};

const Banner = styled.div`
  margin: 0 auto;
  display: flex;
  font-family: 'Calibre-SemiBold';
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  background-color: #f26900;
  padding: 15px 20px;
`;

const BannerText = styled.p`
  margin: 0;
  color: #fff;
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
  white-space: pre-line;
  text-align: center;
`;

export default ErrorBanner;
