import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { KeyboardEventHandler, useCallback } from 'react';

import { useAppStore } from '../../../../../context';
import {
  Container,
  Edit,
  Field,
  Info,
  Label,
  Row,
  Subtitle,
  SubTitleContainer,
} from './Style.css';

const VehicleInformation: React.FC = () => {
  const router = useRouter();
  const { store } = useAppStore();

  const appraisalStore = store.appraisal;

  const OptionsList = () => {
    return (
      <>
        {appraisalStore.vehicleInfoForm.vehicleOptions.map(
          (element: any, index: any) => {
            return <Field key={index}>{element}</Field>;
          }
        )}
      </>
    );
  };

  const handleEditClick = useCallback(() => {
    router
      .push({
        pathname: appraisalStore.appraisalPath,
        query: {
          vehicle: `${appraisalStore?.vehicleInfoForm?.vin}`,
          ...router.query,
        },
        hash: `#top`,
      })
      .catch((e) => {
        console.error(e);
      });
  }, [
    appraisalStore.appraisalPath,
    appraisalStore?.vehicleInfoForm?.vin,
    router,
  ]);

  const onKeyDown: KeyboardEventHandler<HTMLSpanElement> = (event) => {
    if (event.key === 'Enter') {
      handleEditClick();
    }
  };

  function numberWithCommas(x: number | null) {
    if (x === null) {
      return '';
    } else if (isNaN(x)) {
      return '';
    } else {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
  function addElipsesIfLong(str: string) {
    if (str) {
      return str.length > 23 ? str.substr(0, 20) + '...' : str;
    }
  }
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>Vehicle Information</Subtitle>
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
          <Label>VIN</Label>
          <Field>{appraisalStore.vehicleInfoForm.vin}</Field>
        </Info>
        {appraisalStore.vehicleInfoForm.trim && (
          <Info>
            <Label>Trim</Label>
            <Field title={appraisalStore.vehicleInfoForm.trim}>
              {addElipsesIfLong(appraisalStore.vehicleInfoForm.trim)}
            </Field>
          </Info>
        )}
        <Info>
          <Label>Mileage</Label>
          <Field>
            {numberWithCommas(appraisalStore.vehicleInfoForm.mileage)}
          </Field>
        </Info>
      </Row>
      <Row>
        <Info fullWidth={true}>
          <Field>{`(${appraisalStore.vehicleInfoForm.year} ${appraisalStore.vehicleInfoForm.make} ${appraisalStore.vehicleInfoForm.model})`}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Zip Code</Label>
          <Field>{appraisalStore.vehicleInfoForm.zipCode}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Exterior Color</Label>
          <Field>{appraisalStore.vehicleInfoForm.exteriorColor}</Field>
        </Info>

        <Info>
          <Label>Options</Label>
          {appraisalStore.vehicleInfoForm.vehicleOptions.length !== 0 ? (
            <OptionsList />
          ) : (
            <Field>N\A</Field>
          )}
        </Info>
      </Row>
    </Container>
  );
};

export default observer(VehicleInformation);
