import React from 'react';
import { shallow } from 'zustand/shallow';

import { Col, Row } from '../../../../../../../styled/grid';
import SelectBoxes from '../../../../components/SelectBoxes';
import { WizardStepProps } from '../../../../components/WizardForm';
import useVerificationStore from '../../../../store/store';
import { Field, FullInfo, SectionTitle } from '../../../../Styled.css';

const PickupAddressConfirmation = ({
  form,
  nextStep,
  goToStep,
}: WizardStepProps<{
  pickupAddressConfirmation: string;
}>) => {
  const { pickupAddress, pickupState, pickupZip, pickupCity, pickupApt } =
    useVerificationStore(
      (state) => ({
        pickupAddress: state.pickupAddress,
        pickupState: state.pickupState,
        pickupZip: state.pickupZip,
        pickupCity: state.pickupCity,
        pickupApt: state.pickupApt,
      }),
      shallow
    );

  return (
    <div>
      <SectionTitle>Pick up address</SectionTitle>
      <Row>
        <FullInfo>
          <Field>
            {`${pickupApt} ${pickupAddress} ${pickupCity}, ${pickupState} ${pickupZip}`.trim()}
          </Field>
        </FullInfo>
      </Row>
      <br />
      <Row>
        <Col
          size={{
            default: 1 / 2,
            mobile: 1,
          }}
        >
          <SelectBoxes
            label="Is the pickup address correct?"
            options={['Yes', 'No']}
            control={form.control}
            id={'pickupAddressConfirmation'}
            onChange={(value) => {
              if (value === 'Yes') {
                goToStep?.(3);
                return;
              }
              nextStep?.();
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PickupAddressConfirmation;
