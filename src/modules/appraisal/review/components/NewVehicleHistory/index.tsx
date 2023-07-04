import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { KeyboardEventHandler, useCallback, useMemo } from 'react';

import { useAppStore } from '../../../../../context';
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
  const { store } = useAppStore();
  const appraisalDetail = store.appraisal;

  const warningLightsValues = useMemo(() => {
    return store.appraisal.mechConditionForm.warningLightsValues;
  }, [store.appraisal.mechConditionForm.warningLightsValues]);

  const afterMarketOptions = useMemo(() => {
    return store.appraisal.extConditionForm.afterMarket;
  }, [store.appraisal.extConditionForm.afterMarket]);

  const handleEditClick = useCallback(() => {
    router
      .push({
        pathname: store.appraisal.appraisalPath,
        query: {
          vehicle: `${store.appraisal?.vehicleInfoForm?.vin}`,
          ...router.query,
        },
        hash: `#vehiclehistory`,
      })
      .catch((e) => {
        console.error(e);
      });
  }, [
    router,
    store.appraisal.appraisalPath,
    store.appraisal?.vehicleInfoForm?.vin,
  ]);

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
          <Field>{appraisalDetail?.vehicleHistoryForm?.hasAccident}</Field>
        </Info>
        {appraisalDetail?.vehicleHistoryForm?.state && (
          <Info>
            <Label>State of Purchase</Label>
            <Field>{appraisalDetail.vehicleHistoryForm.state}</Field>
          </Info>
        )}
        <Info>
          <Label>Title</Label>
          <Field>{appraisalDetail?.vehicleHistoryForm?.titleStatus}</Field>
        </Info>
      </Row>
      {appraisalDetail?.vehicleHistoryForm?.hasAccident === 'Yes' && (
        <Row>
          <Info>
            <Label>Repaired damage</Label>
            <Field>
              {appraisalDetail?.vehicleHistoryForm?.repairedAfterAccident}
            </Field>
          </Info>
        </Row>
      )}
      {appraisalDetail?.vehicleHistoryForm?.lienType && (
        <Row>
          <Info>
            <Label>Loan or lease on your vehicle?</Label>
            <Field>{appraisalDetail?.vehicleHistoryForm?.lienType}</Field>
          </Info>
          {appraisalDetail?.vehicleHistoryForm?.bankName && (
            <Info>
              <Label>Bank Name</Label>
              <Field>{appraisalDetail?.vehicleHistoryForm?.bankName}</Field>
            </Info>
          )}
        </Row>
      )}
      <SmallSubtitle>Mechanical & Electrical Issues</SmallSubtitle>
      <Row>
        {warningLightsValues && (
          <Info>
            <Label>Warning Lights</Label>
            {appraisalDetail?.mechConditionForm?.warningLights === 'No' && (
              <Field>{appraisalDetail?.mechConditionForm?.warningLights}</Field>
            )}
            {warningLightsValues.map((element: string, index: number) => {
              return <Field key={index}>{element}</Field>;
            })}
            {appraisalDetail?.mechConditionForm?.otherWarning && (
              <Field>{appraisalDetail?.mechConditionForm?.otherWarning}</Field>
            )}
          </Info>
        )}
        <Info>
          <Label>Transmission</Label>
          <Field>{appraisalDetail.mechConditionForm.transmissionIssue}</Field>
        </Info>
        <Info>
          <Label>Engine</Label>
          <Field>{appraisalDetail.mechConditionForm.engineIssue}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Does Not Run/Not Drivable</Label>
          <Field>
            {appraisalDetail.mechConditionForm.runnable === 'Yes'
              ? 'No'
              : 'Yes'}
          </Field>
        </Info>
        <Info>
          <Label>No Mechanical or Electrical Issues</Label>
          <Field>{appraisalDetail.mechConditionForm.noMechanicalIssues}</Field>
        </Info>
      </Row>
      <SmallSubtitle>Exterior Damage</SmallSubtitle>
      <Row>
        <Info>
          <Label>Paint Damage/Imperfections</Label>
          <Field>
            {appraisalDetail?.extConditionForm?.paintChippingPanels
              ? `${appraisalDetail?.extConditionForm?.paintChippingPanels} Panel(s)`
              : appraisalDetail?.extConditionForm?.paintChipping}
          </Field>
        </Info>
        <Info>
          <Label>Dents</Label>
          <Field>
            {appraisalDetail?.extConditionForm?.dentsPanels
              ? `${appraisalDetail?.extConditionForm?.dentsPanels} Panel(s)`
              : appraisalDetail?.extConditionForm?.dents}
          </Field>
        </Info>
        <Info>
          <Label>Scratches</Label>
          <Field>
            {appraisalDetail?.extConditionForm?.scratchesPanels
              ? `${appraisalDetail?.extConditionForm?.scratchesPanels} Panel(s)`
              : appraisalDetail?.extConditionForm?.scratches}
          </Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Rust</Label>
          <Field>{appraisalDetail?.extConditionForm?.rust}</Field>
        </Info>
        <Info>
          <Label>Hail Damage</Label>
          <Field>{appraisalDetail?.extConditionForm?.hailDamage}</Field>
        </Info>
        <Info>
          <Label>Water Damage</Label>
          <Field>{appraisalDetail?.extConditionForm?.floodDamage}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Frame or structural damage</Label>
          <Field>
            {appraisalDetail?.extConditionForm?.frameOrStructuralDamage}
          </Field>
        </Info>
        <Info>
          <Label>Windshield cracked</Label>
          <Field>
            {appraisalDetail?.extConditionForm?.windshieldCrackedChipped}
          </Field>
        </Info>
        <Info>
          <Label>Major damage</Label>
          <Field>
            {appraisalDetail?.extConditionForm?.majorDamageExterior}
          </Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Fire Damage</Label>
          <Field>{appraisalDetail?.extConditionForm?.fireDamage}</Field>
        </Info>
        <Info>
          <Label>Worn Tires</Label>
          <Field>{appraisalDetail?.extConditionForm?.wornTires}</Field>
        </Info>
        <Info>
          <Label>No Exterior Damage</Label>
          <Field>{appraisalDetail?.extConditionForm?.noExteriorDamage}</Field>
        </Info>
      </Row>
      <SmallSubtitle>Interior Damage</SmallSubtitle>
      <Row>
        <Info>
          <Label>Rips or Tears in Seats</Label>
          <Field>{appraisalDetail?.intConditionForm?.ripsOrTearsInSeats}</Field>
        </Info>
        <Info>
          <Label>Persistent Odors</Label>
          <Field>{appraisalDetail?.intConditionForm?.smokedIn}</Field>
        </Info>
        <Info>
          <Label>Damaged Electronic Equipment</Label>
          <Field>{appraisalDetail?.intConditionForm?.damagedElectronic}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Damaged Dashboard or Interior Panels</Label>
          <Field>
            {appraisalDetail?.intConditionForm?.damagedDashboardOrPanels}
          </Field>
        </Info>
        <Info>
          <Label>Major damage</Label>
          <Field>
            {appraisalDetail?.intConditionForm?.majorDamageInterior}
          </Field>
        </Info>
        <Info>
          <Label>No Interior Damage</Label>
          <Field>{appraisalDetail?.intConditionForm?.noInteriorDamage}</Field>
        </Info>
      </Row>
      <SmallSubtitle>Aftermarket Modification</SmallSubtitle>
      <Row>
        <Info>
          {appraisalDetail?.extConditionForm?.afterMarket.length > 0 ? (
            afterMarketOptions.map((element: any, index: any) => {
              let value = element;
              if (element === 'Other') {
                value = `Other (${appraisalDetail?.extConditionForm?.otherAfterMarket})`;
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
          {appraisalDetail?.mechConditionForm?.additionalDetails ? (
            <Field>
              {appraisalDetail?.mechConditionForm?.additionalDetails}
            </Field>
          ) : (
            <Field>N\A</Field>
          )}
        </Info>
      </Row>
      {(appraisalDetail?.extConditionForm?.afterMarket.includes('Exhaust') ||
        appraisalDetail?.extConditionForm?.afterMarket.includes(
          'Performance'
        ) ||
        appraisalDetail?.extConditionForm?.afterMarket.includes('Other')) && (
        <Row>
          <Info>
            <Label>Pass emission standards</Label>
            <Field>
              {appraisalDetail?.extConditionForm?.passStateEmissionStandards}
            </Field>
          </Info>
        </Row>
      )}
    </Container>
  );
};

export default observer(NewVehicleHistory);
