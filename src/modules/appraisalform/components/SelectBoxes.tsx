import { HorizontalRadio, HorizontalRadioOption } from '@vroom-web/ui-lib';
import React, { useState } from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../interfaces.d';
import Dialog from '../Dialog/Panels';

import Icon, { Icons } from 'src/core/Icon';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

interface Props {
  field: GenericObject;
}

const SelectBoxes: React.FC<Props> = ({
  field: { options, onClick, value, label, panelsTooltip, id },
}) => {
  const analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  const [showPanelsDialog, setShowPanelsDialog] = useState(false);

  const handleShowPanelsDialog = () => {
    analyticsHandler.trackPanelsTooltip(panelsTooltip);
    setShowPanelsDialog(true);
  };

  const handleHidePanelsDialog = () => {
    setShowPanelsDialog(false);
  };
  return (
    <Container>
      <LabelContainer>
        <Label>{label}</Label>
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
      <HorizontalRadioContainer>
        <HorizontalRadio
          id={id}
          options={mapOptions(options)}
          onChange={onClick}
          value={value}
        />
      </HorizontalRadioContainer>
      {showPanelsDialog && (
        <Dialog closeModalHandler={handleHidePanelsDialog} />
      )}
    </Container>
  );
};

const mapOptions = (options: []): HorizontalRadioOption[] => {
  return options.map((option) => ({ label: option, value: option }));
};

const Container = styled.div``;

const LabelContainer = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 18px;
`;

const RowTitleIcon = styled(Icon)`
  height: 16px;
  width: 16px;
`;

const Label = styled.label`
  font-size: 18px;
  line-height: 1;
  letter-spacing: 0.3px;
  margin-bottom: 10px;
`;

const HorizontalRadioContainer = styled.div`
  span {
    border-color: #d6d7da;
    text-transform: none;
    font-weight: 400;
    height: 40px;

    &:hover {
      background-color: unset !important;
    }
  }

  div[role='radiogroup'] {
    border: none;
  }

  input:not(:checked) + span {
    border: 1px solid #d6d7da;
    color: #999da3;
  }

  input:checked + span {
    border: 2px solid #e7131a !important;
  }
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
