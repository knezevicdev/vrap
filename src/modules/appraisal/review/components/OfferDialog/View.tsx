import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import {
  AcceptButton,
  Cancel,
  Content,
  DialogContainer,
  DialogTitle,
  Legal,
  LegalContainer,
  Overlay,
  Price,
} from './Style.css';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const OfferDialogView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Overlay>
      <DialogContainer data-qa="AppraisalOfferDialog">
        <DialogTitle hasValidPrice={viewModel.hasValidPrice}>
          {viewModel.hasValidPrice
            ? 'Your offer'
            : 'Thanks for submitting your appraisal'}
        </DialogTitle>
        {viewModel.hasValidPrice && <Price>{viewModel.price}</Price>}
        {viewModel.hasValidPrice && (
          <Content>
            This price expires on&nbsp;
            <b>{viewModel.expirationDate}</b>
            &nbsp;or upon driving an additional <b>250 miles</b>, whichever
            occurs &nbsp;first. The &nbsp;<b>vehicle title </b>
            &nbsp;must be in your name.
          </Content>
        )}
        {!viewModel.hasValidPrice && (
          <>
            <Content>Our buying specialists are taking a closer look.</Content>
            <Content freeForm>
              <b>In the meantime, things to know:</b>
              <ul>
                <li>
                  Our team will send you a price for your car within 1 business
                  day.
                </li>
                <li>
                  To guarantee this purchase, please continue and we can apply
                  your trade-in value with one of our car specialists later.
                </li>
              </ul>
            </Content>
          </>
        )}
        <AcceptButton
          onClick={viewModel.acceptPrice}
          hasValidPrice={viewModel.hasValidPrice}
        >
          {viewModel.hasValidPrice ? 'Apply to purchase' : 'Continue Purchase'}
        </AcceptButton>
        {viewModel.hasValidPrice && (
          <Cancel onClick={viewModel.declinePrice}>
            Continue without applying
          </Cancel>
        )}
        {viewModel.hasValidPrice && (
          <LegalContainer>
            <Legal>
              *This price is based on data from thousands of similar market
              transactions, as well as the information you provided. Vroom may
              modify or revoke this price if the information you provided is
              inaccurate or if there is a significant present or prospective
              change in the used vehicle market beyond Vroom&apos;s Control.
              Other terms and restrictions apply.
            </Legal>
          </LegalContainer>
        )}
      </DialogContainer>
    </Overlay>
  );
};

export default observer(OfferDialogView);
