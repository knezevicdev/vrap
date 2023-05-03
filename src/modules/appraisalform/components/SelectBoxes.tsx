import {
  HorizontalRadio,
  HorizontalRadioOption,
  Tooltip,
} from '@vroom-web/ui-lib';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useAppStore } from '../../../context';
import { GenericObject } from '../../../interfaces.d';
import Dialog from '../Dialog/Panels';

import Icon, { Icons } from 'src/core/Icon';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

interface Props {
  field: GenericObject;
  className?: string;
}

const SelectBoxes: React.FC<Props> = ({
  field: {
    options,
    onClick,
    value,
    label,
    tooltip,
    panelsTooltip,
    id,
    forceValidate,
  },
  className,
}) => {
  const analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  const { store } = useAppStore();
  const [showPanelsDialog, setShowPanelsDialog] = useState(false);

  const handleShowPanelsDialog = () => {
    analyticsHandler.trackPanelsTooltip(
      panelsTooltip,
      store.appraisal.eventCategory
    );
    setShowPanelsDialog(true);
  };

  const handleHidePanelsDialog = () => {
    setShowPanelsDialog(false);
  };

  const error = forceValidate && !value ? 'Please select one option' : '';

  return (
    <Container className={className}>
      {label && (
        <LabelContainer>
          <Label>{label}</Label>
          {tooltip && <Tooltip content={tooltip} />}
          {panelsTooltip && (
            <InfoButton
              onClick={() => {
                handleShowPanelsDialog();
              }}
            >
              <RowTitleIcon icon={Icons.INFO} />
            </InfoButton>
          )}
        </LabelContainer>
      )}
      <HorizontalRadio
        id={id}
        options={mapOptions(options)}
        onChange={onClick}
        value={value}
        error={error}
        required={true}
      />
      {showPanelsDialog && (
        <Dialog closeModalHandler={handleHidePanelsDialog} />
      )}
    </Container>
  );
};

const mapOptions = (options: []): HorizontalRadioOption[] => {
  return options.map((option) => ({
    label: option,
    value: option,
    'data-qa': option,
  }));
};

const Container = styled.div``;

export const LabelContainer = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 18px;
  align-items: center;
`;

const RowTitleIcon = styled(Icon)`
  height: 16px;
  width: 16px;
`;

export const Label = styled.label`
  font-size: 18px;
  line-height: 1;
  letter-spacing: 0.3px;
  margin-bottom: 10px;
`;

const InfoButton = styled.button`
  margin: 2px 0 0 5px;
  background: none;
  border: none;
  cursor: pointer;
  height: 16px;
  width: 16px;
  padding: 0;
`;

export default SelectBoxes;
