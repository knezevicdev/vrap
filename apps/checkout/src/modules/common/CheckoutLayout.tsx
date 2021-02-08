import { GQLTypes } from '@vroom-web/networking';
import { ThemeProps } from '@vroom-web/temp-ui-alias-for-checkout';
import React, { FC } from 'react';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';
import { ProgressBar } from './ProgressBar';

// const grayThree = (props: { theme: ThemeProps }): string =>
//   props.theme.colors.gray.three;

// const Wrapper = styled.div`
//   width: inherit;
//   display: inline-flex;
//   flex-direction: column;
// `;

// const CarInfo = styled.div`
//   margin: 16px;
//   display: grid;
//   grid-template-rows: 1fr;
//   gap: 8px;
// `;

// const RegularText = styled(Body.Regular)`
//   font-size: 16px;
// `;

// const Divider = styled(Body.Regular)`
//   color: ${grayThree};
//   font-size: 20px;
// `;

// const SelectedCar = (): JSX.Element => {
//   return (
//     <Wrapper>
//       <Picture
//         alt=""
//         src={
//           'https://cdn.spincar.com/swipetospin-viewers/vroomsanfrancisco/3fadp4bj7hm145254/20201218184155.FY8RPMJI/closeups/cu-0.jpg'
//         }
//         width="100%"
//         height="310px"
//         objectFit="cover"
//       />

//       <CarInfo>
//         <Body.Regular bold>{`2016 NISSAN Murano`}</Body.Regular>
//         <RegularText>
//           {`SH-AWD w/Tech`} <Divider>|</Divider> {`28,661 miles`} miles
//         </RegularText>
//         <Body.Regular bold>{`$36,480`}</Body.Regular>
//       </CarInfo>
//     </Wrapper>
//   );
// };

const grayFour = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.four;

const Container = styled.div`
  background-color: ${grayFour};
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
`;

const TrackerSection = styled.div`
  max-width: 1280px;
  width: 100%;
  justify-self: center;
  margin: 16px 0px;
`;

const CheckoutSection = styled.div`
  padding: 0 16px 24px 16px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 32px;
  max-width: 1280px;
  justify-self: center;
  box-sizing: border-box;
  @media (max-width: 800px) {
    padding: 0 0 24px 0;
  }
`;

const DealContent = styled.div`
  background-color: #ffffff;
  width: 100%;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  grid-column: span 8;
  padding: 32px 96px 40px;
  display: table;
  @media (max-width: 1023px) {
    grid-column: span 12;
  }
  @media (max-width: 800px) {
    padding: 32px 40px 40px;
  }
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const DealSummary = styled.div`
  display: table;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  width: 100%;
  min-height: 40vh;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  grid-column: span 4;
  @media (max-width: 1023px) {
    display: none;
  }
`;

interface Props {
  steps: string[];
  activeStep: number;
  deal?: GQLTypes.Deal;
}

const CheckoutLayout: FC<Props> = ({ steps, activeStep, deal, children }) => {
  return (
    <Container>
      <Header />
      <TrackerSection>
        <ProgressBar steps={steps} activeStep={activeStep} />
      </TrackerSection>
      <CheckoutSection>
        <DealContent>{children}</DealContent>
        {/* Deal goes here as prop */}
        <DealSummary>{/* <SelectedCar /> */}</DealSummary>
      </CheckoutSection>
      <Footer />
    </Container>
  );
};

export default CheckoutLayout;
