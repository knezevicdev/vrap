import { useRouter } from 'next/router';
import React, { KeyboardEventHandler, useCallback, useMemo } from 'react';
import { shallow } from 'zustand/shallow';

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

  const {
    mechConditionForm,
    extConditionForm,
    vehicleHistoryForm,
    intConditionForm,
  } = useAppraisalStore(
    ({
      mechConditionForm,
      extConditionForm,
      vehicleHistoryForm,
      intConditionForm,
    }) => ({
      mechConditionForm,
      extConditionForm,
      vehicleHistoryForm,
      intConditionForm,
    }),
    shallow
  );

  const appraisalPath = useAppraisalStore((state) => state.appraisalPath());
  const vin = useAppraisalStore((state) => state.vehicleInfoForm?.vin);

  const warningLightsValues = useMemo(() => {
    return mechConditionForm.warningLightsValues;
  }, [mechConditionForm.warningLightsValues]);

  const afterMarketOptions = useMemo(() => {
    return extConditionForm.afterMarket;
  }, [extConditionForm.afterMarket]);

  const handleEditClick = useCallback(() => {
    router
      .push({
        pathname: appraisalPath,
        query: {
          vehicle: vin,
        },
        hash: `#vehiclehistory`,
      })
      .catch((e) => {
        console.error(e);
      });
  }, [appraisalPath, router, vin]);

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
          <Field>{vehicleHistoryForm?.hasAccident}</Field>
        </Info>
        {vehicleHistoryForm?.state && (
          <Info>
            <Label>State of Purchase</Label>
            <Field>{vehicleHistoryForm.state}</Field>
          </Info>
        )}
        <Info>
          <Label>Title</Label>
          <Field>{vehicleHistoryForm?.titleStatus}</Field>
        </Info>
      </Row>
      {vehicleHistoryForm?.hasAccident === 'Yes' && (
        <Row>
          <Info>
            <Label>Repaired damage</Label>
            <Field>{vehicleHistoryForm?.repairedAfterAccident}</Field>
          </Info>
        </Row>
      )}
      {vehicleHistoryForm?.lienType && (
        <Row>
          <Info>
            <Label>Loan or lease on your vehicle?</Label>
            <Field>{vehicleHistoryForm?.lienType}</Field>
          </Info>
          {vehicleHistoryForm?.bankName && (
            <Info>
              <Label>Bank Name</Label>
              <Field>{vehicleHistoryForm?.bankName}</Field>
            </Info>
          )}
        </Row>
      )}
      <SmallSubtitle>Mechanical & Electrical Issues</SmallSubtitle>
      <Row>
        {warningLightsValues && (
          <Info>
            <Label>Warning Lights</Label>
            {mechConditionForm?.warningLights === 'No' && (
              <Field>{mechConditionForm?.warningLights}</Field>
            )}
            {warningLightsValues.map((element: string, index: number) => {
              return <Field key={index}>{element}</Field>;
            })}
            {mechConditionForm?.otherWarning && (
              <Field>{mechConditionForm?.otherWarning}</Field>
            )}
          </Info>
        )}
        <Info>
          <Label>Transmission</Label>
          <Field>{mechConditionForm.transmissionIssue}</Field>
        </Info>
        <Info>
          <Label>Engine</Label>
          <Field>{mechConditionForm.engineIssue}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Does Not Run/Not Drivable</Label>
          <Field>{mechConditionForm.runnable === 'Yes' ? 'No' : 'Yes'}</Field>
        </Info>
        <Info>
          <Label>No Mechanical or Electrical Issues</Label>
          <Field>{mechConditionForm.noMechanicalIssues}</Field>
        </Info>
      </Row>
      <SmallSubtitle>Exterior Damage</SmallSubtitle>
      <Row>
        <Info>
          <Label>Paint Damage/Imperfections</Label>
          <Field>
            {extConditionForm?.paintChippingPanels
              ? `${extConditionForm?.paintChippingPanels} Panel(s)`
              : extConditionForm?.paintChipping}
          </Field>
        </Info>
        <Info>
          <Label>Dents</Label>
          <Field>
            {extConditionForm?.dentsPanels
              ? `${extConditionForm?.dentsPanels} Panel(s)`
              : extConditionForm?.dents}
          </Field>
        </Info>
        <Info>
          <Label>Scratches</Label>
          <Field>
            {extConditionForm?.scratchesPanels
              ? `${extConditionForm?.scratchesPanels} Panel(s)`
              : extConditionForm?.scratches}
          </Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Rust</Label>
          <Field>{extConditionForm?.rust}</Field>
        </Info>
        <Info>
          <Label>Hail Damage</Label>
          <Field>{extConditionForm?.hailDamage}</Field>
        </Info>
        <Info>
          <Label>Water Damage</Label>
          <Field>{extConditionForm?.floodDamage}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Frame or structural damage</Label>
          <Field>{extConditionForm?.frameOrStructuralDamage}</Field>
        </Info>
        <Info>
          <Label>Windshield cracked</Label>
          <Field>{extConditionForm?.windshieldCrackedChipped}</Field>
        </Info>
        <Info>
          <Label>Major damage</Label>
          <Field>{extConditionForm?.majorDamageExterior}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Fire Damage</Label>
          <Field>{extConditionForm?.fireDamage}</Field>
        </Info>
        <Info>
          <Label>Worn Tires</Label>
          <Field>{extConditionForm?.wornTires}</Field>
        </Info>
        <Info>
          <Label>No Exterior Damage</Label>
          <Field>{extConditionForm?.noExteriorDamage}</Field>
        </Info>
      </Row>
      <SmallSubtitle>Interior Damage</SmallSubtitle>
      <Row>
        <Info>
          <Label>Rips or Tears in Seats</Label>
          <Field>{intConditionForm?.ripsOrTearsInSeats}</Field>
        </Info>
        <Info>
          <Label>Persistent Odors</Label>
          <Field>{intConditionForm?.smokedIn}</Field>
        </Info>
        <Info>
          <Label>Damaged Electronic Equipment</Label>
          <Field>{intConditionForm?.damagedElectronic}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Damaged Dashboard or Interior Panels</Label>
          <Field>{intConditionForm?.damagedDashboardOrPanels}</Field>
        </Info>
        <Info>
          <Label>Major damage</Label>
          <Field>{intConditionForm?.majorDamageInterior}</Field>
        </Info>
        <Info>
          <Label>No Interior Damage</Label>
          <Field>{intConditionForm?.noInteriorDamage}</Field>
        </Info>
      </Row>
      <SmallSubtitle>Aftermarket Modification</SmallSubtitle>
      <Row>
        <Info>
          {extConditionForm?.afterMarket.length > 0 ? (
            afterMarketOptions.map((element: any, index: any) => {
              let value = element;
              if (element === 'Other') {
                value = `Other (${extConditionForm?.otherAfterMarket})`;
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
          {mechConditionForm?.additionalDetails ? (
            <Field>{mechConditionForm?.additionalDetails}</Field>
          ) : (
            <Field>N\A</Field>
          )}
        </Info>
      </Row>
      {(extConditionForm?.afterMarket.includes('Exhaust') ||
        extConditionForm?.afterMarket.includes('Performance') ||
        extConditionForm?.afterMarket.includes('Other')) && (
        <Row>
          <Info>
            <Label>Pass emission standards</Label>
            <Field>{extConditionForm?.passStateEmissionStandards}</Field>
          </Info>
        </Row>
      )}
    </Container>
  );
};

export default NewVehicleHistory;
