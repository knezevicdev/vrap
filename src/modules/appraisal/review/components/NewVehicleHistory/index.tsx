import { useRouter } from 'next/router';
import React, { KeyboardEventHandler, useCallback, useMemo } from 'react';

import useAppraisalStore from '../../../../../store/appraisalStore';
import {
  Container,
  Edit,
  Field,
  Info,
  Label,
  Row,
  SmallSubtitle,
  Subtitle,
  SubTitleContainer,
} from './Style.css';

const NewVehicleHistory: React.FC = () => {
  const router = useRouter();

  const store = useAppraisalStore();

  const warningLightsValues = useMemo(() => {
    return store.mechConditionForm.warningLightsValues;
  }, [store.mechConditionForm.warningLightsValues]);

  const afterMarketOptions = useMemo(() => {
    return store.extConditionForm.afterMarket;
  }, [store.extConditionForm.afterMarket]);

  const handleEditClick = useCallback(() => {
    router
      .push({
        pathname: store.appraisalPath(),
        query: {
          vehicle: `${store?.vehicleInfoForm?.vin}`,
          ...router.query,
        },
        hash: `#vehiclehistory`,
      })
      .catch((e) => {
        console.error(e);
      });
  }, [router, store.appraisalPath, store?.vehicleInfoForm?.vin]);

  const onKeyDown: KeyboardEventHandler<HTMLSpanElement> = (event) => {
    if (event.key === 'Enter') {
      handleEditClick();
    }
  };

  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>Vehicle History & Condition</Subtitle>
        <Edit
          role="button"
          tabIndex={0}
          onClick={handleEditClick}
          onKeyDown={onKeyDown}
        >
          Edit
        </Edit>
      </SubTitleContainer>
      <Row>
        <Info>
          <Label>Accident</Label>
          <Field>{store.vehicleHistoryForm?.hasAccident}</Field>
        </Info>
        {store.vehicleHistoryForm?.state && (
          <Info>
            <Label>State of Purchase</Label>
            <Field>{store.vehicleHistoryForm.state}</Field>
          </Info>
        )}
        <Info>
          <Label>Title</Label>
          <Field>{store.vehicleHistoryForm?.titleStatus}</Field>
        </Info>
      </Row>
      {store.vehicleHistoryForm?.hasAccident === 'Yes' && (
        <Row>
          <Info>
            <Label>Repaired damage</Label>
            <Field>{store.vehicleHistoryForm?.repairedAfterAccident}</Field>
          </Info>
        </Row>
      )}
      {store.vehicleHistoryForm?.lienType && (
        <Row>
          <Info>
            <Label>Loan or lease on your vehicle?</Label>
            <Field>{store.vehicleHistoryForm?.lienType}</Field>
          </Info>
          {store.vehicleHistoryForm?.bankName && (
            <Info>
              <Label>Bank Name</Label>
              <Field>{store.vehicleHistoryForm?.bankName}</Field>
            </Info>
          )}
        </Row>
      )}
      <SmallSubtitle>Mechanical & Electrical Issues</SmallSubtitle>
      <Row>
        {warningLightsValues && (
          <Info>
            <Label>Warning Lights</Label>
            {store.mechConditionForm?.warningLights === 'No' && (
              <Field>{store.mechConditionForm?.warningLights}</Field>
            )}
            {warningLightsValues.map((element: string, index: number) => {
              return <Field key={index}>{element}</Field>;
            })}
            {store.mechConditionForm?.otherWarning && (
              <Field>{store.mechConditionForm?.otherWarning}</Field>
            )}
          </Info>
        )}
        <Info>
          <Label>Transmission</Label>
          <Field>{store.mechConditionForm.transmissionIssue}</Field>
        </Info>
        <Info>
          <Label>Engine</Label>
          <Field>{store.mechConditionForm.engineIssue}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Does Not Run/Not Drivable</Label>
          <Field>
            {store.mechConditionForm.runnable === 'Yes' ? 'No' : 'Yes'}
          </Field>
        </Info>
        <Info>
          <Label>No Mechanical or Electrical Issues</Label>
          <Field>{store.mechConditionForm.noMechanicalIssues}</Field>
        </Info>
      </Row>
      <SmallSubtitle>Exterior Damage</SmallSubtitle>
      <Row>
        <Info>
          <Label>Paint Damage/Imperfections</Label>
          <Field>
            {store.extConditionForm?.paintChippingPanels
              ? `${store.extConditionForm?.paintChippingPanels} Panel(s)`
              : store.extConditionForm?.paintChipping}
          </Field>
        </Info>
        <Info>
          <Label>Dents</Label>
          <Field>
            {store.extConditionForm?.dentsPanels
              ? `${store.extConditionForm?.dentsPanels} Panel(s)`
              : store.extConditionForm?.dents}
          </Field>
        </Info>
        <Info>
          <Label>Scratches</Label>
          <Field>
            {store.extConditionForm?.scratchesPanels
              ? `${store.extConditionForm?.scratchesPanels} Panel(s)`
              : store.extConditionForm?.scratches}
          </Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Rust</Label>
          <Field>{store.extConditionForm?.rust}</Field>
        </Info>
        <Info>
          <Label>Hail Damage</Label>
          <Field>{store.extConditionForm?.hailDamage}</Field>
        </Info>
        <Info>
          <Label>Water Damage</Label>
          <Field>{store.extConditionForm?.floodDamage}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Frame or structural damage</Label>
          <Field>{store.extConditionForm?.frameOrStructuralDamage}</Field>
        </Info>
        <Info>
          <Label>Windshield cracked</Label>
          <Field>{store.extConditionForm?.windshieldCrackedChipped}</Field>
        </Info>
        <Info>
          <Label>Major damage</Label>
          <Field>{store.extConditionForm?.majorDamageExterior}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Fire Damage</Label>
          <Field>{store.extConditionForm?.fireDamage}</Field>
        </Info>
        <Info>
          <Label>Worn Tires</Label>
          <Field>{store.extConditionForm?.wornTires}</Field>
        </Info>
        <Info>
          <Label>No Exterior Damage</Label>
          <Field>{store.extConditionForm?.noExteriorDamage}</Field>
        </Info>
      </Row>
      <SmallSubtitle>Interior Damage</SmallSubtitle>
      <Row>
        <Info>
          <Label>Rips or Tears in Seats</Label>
          <Field>{store.intConditionForm?.ripsOrTearsInSeats}</Field>
        </Info>
        <Info>
          <Label>Persistent Odors</Label>
          <Field>{store.intConditionForm?.smokedIn}</Field>
        </Info>
        <Info>
          <Label>Damaged Electronic Equipment</Label>
          <Field>{store.intConditionForm?.damagedElectronic}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Damaged Dashboard or Interior Panels</Label>
          <Field>{store.intConditionForm?.damagedDashboardOrPanels}</Field>
        </Info>
        <Info>
          <Label>Major damage</Label>
          <Field>{store.intConditionForm?.majorDamageInterior}</Field>
        </Info>
        <Info>
          <Label>No Interior Damage</Label>
          <Field>{store.intConditionForm?.noInteriorDamage}</Field>
        </Info>
      </Row>
      <SmallSubtitle>Aftermarket Modification</SmallSubtitle>
      <Row>
        <Info>
          {store.extConditionForm?.afterMarket.length > 0 ? (
            afterMarketOptions.map((element: any, index: any) => {
              let value = element;
              if (element === 'Other') {
                value = `Other (${store.extConditionForm?.otherAfterMarket})`;
              }
              return <Field key={index}>{value}</Field>;
            })
          ) : (
            <Field>N\A</Field>
          )}
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Additional Information</Label>
          {store.mechConditionForm?.additionalDetails ? (
            <Field>{store.mechConditionForm?.additionalDetails}</Field>
          ) : (
            <Field>N\A</Field>
          )}
        </Info>
      </Row>
      {(store.extConditionForm?.afterMarket.includes('Exhaust') ||
        store.extConditionForm?.afterMarket.includes('Performance') ||
        store.extConditionForm?.afterMarket.includes('Other')) && (
        <Row>
          <Info>
            <Label>Pass emission standards</Label>
            <Field>{store.extConditionForm?.passStateEmissionStandards}</Field>
          </Info>
        </Row>
      )}
    </Container>
  );
};

export default NewVehicleHistory;
