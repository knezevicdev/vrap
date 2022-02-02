import { addStyleForMobile, Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import PendingPriceViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import Icon, { Icons } from 'src/core/Icon';
import { Body, Hero } from 'src/core/Typography';
interface Props {
  viewModel: PendingPriceViewModel;
}

const PendingPriceView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    viewModel.onPageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer className={viewModel.isNoPriceExp() ? 'sb-no-price' : ''}>
      {viewModel.isNoPriceExp() ? (
        <NoPriceContainer>
          <NoPricetitle>{viewModel.noPriceTitle}</NoPricetitle>
          <NoPriceDesc>{viewModel.noPriceDesc}</NoPriceDesc>
          <NoPriceListTitle>{viewModel.noPriceThingsToKnow}</NoPriceListTitle>
          {viewModel.noPricelistItems.map((item, i) => {
            return (
              <NoPriceListContainer key={i}>
                <NoPricePoint />
                <NoPriceListItem>{item}</NoPriceListItem>
              </NoPriceListContainer>
            );
          })}
        </NoPriceContainer>
      ) : (
        <>
          <Hero.Four>{viewModel.sitTight}</Hero.Four>
          <StyledIcon icon={Icons.CAR_OFFER} />

          <StyledBody>
            <Body.Regular>{viewModel.takingALook}</Body.Regular>
          </StyledBody>
          <StyledBody>
            <Body.Regular>
              <i>{viewModel.spamFolder}</i>
            </Body.Regular>
          </StyledBody>
        </>
      )}
      <StyledButton onClick={viewModel.handleFindCar}>
        {viewModel.findCar}
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  text-align: center;

  &.sb-no-price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const StyledBody = styled.div`
  max-width: 410px;
  margin: auto;
`;

const StyledIcon = styled(Icon)`
  padding: 20px;
`;

const StyledButton = styled(Button.Primary)`
  margin: 30px 0;
  width: 100%;
  max-width: 300px;
`;
const NoPriceContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;

  ${addStyleForMobile(`
    width: 100%;
  `)};
`;

const NoPricetitle = styled(Typography.Heading.Three)`
  font-family: Vroom-Sans;
  font-weight: 800;
  font-size: 36px;
  line-height: 40px;
  text-align: center;
  letter-spacing: 1px;
  margin-bottom: 18px;

  ${addStyleForMobile(`
    font-size: 30px;
    margin-bottom: 16px;
  `)};
`;

const NoPriceDesc = styled(Typography.Body.Regular)`
  width: 400px;
  margin-bottom: 32px;

  ${addStyleForMobile(`
    width: 100%;
    padding: 0 30px;
  `)};
`;

const NoPriceListTitle = styled(Typography.Title.Three)`
  margin-bottom: 16px;
`;
const NoPriceListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 18px;
`;

const NoPricePoint = styled.span`
  width: 8px;
  height: 8px;
  background-color: #041022;
  border-radius: 4px;
  margin: 8px;
`;

const NoPriceListItem = styled(Typography.Body.Regular)`
  text-align: left;
  width: 307px;
  ${addStyleForMobile(`
    width: 275px;
  `)};
`;

export default observer(PendingPriceView);
