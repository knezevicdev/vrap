import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../interfaces.d';
import Dialog from '../Dialog/Panels';

import Icon, { Icons } from 'src/core/Icon';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

interface Props {
  field: GenericObject;
  className?: string;
  externalLabel?: any;
  panelsTooltip?: any;
}

const SelectBoxes: React.FC<Props> = ({
  field: { options, onClick, value, label, panelsTooltip },
  className,
  externalLabel,
}) => {
  const analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  const [showPanelsDialog, setShowPanelsDialog] = useState(false);
  const [active, setActive] = useState();

  useEffect(() => {
    const handleFocusIn = () => {
      setActive(document.activeElement);
    };

    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  const handleShowPanelsDialog = () => {
    analyticsHandler.trackPanelsTooltip(panelsTooltip);
    setShowPanelsDialog(true);
  };

  const handleHidePanelsDialog = () => {
    setShowPanelsDialog(false);
  };

  const handleKeyPress = (event: GenericObject) => {
    if (event.key === ' ' && active === event.currentTarget) {
      event.currentTarget.click();
      event.preventDefault();
    }
  };

  return (
    <Container className={className}>
      {externalLabel || (
        <LabelContainer>
          <Label>{label}</Label>
          {panelsTooltip && (
            <RowTitleIcon
              icon={Icons.QUESTION_CIRCLE}
              onClick={() => {
                handleShowPanelsDialog();
              }}
            />
          )}
        </LabelContainer>
      )}
      <OptionsContainer data-qa="SelectBoxesComponent">
        {options.map((item: any) => {
          return (
            <Option
              isSelected={value === item}
              key={item}
              onClick={() => onClick(item)}
              optionsLength={options.length}
              data-qa={item}
              onKeyPress={handleKeyPress}
            >
              {item}
            </Option>
          );
        })}
      </OptionsContainer>
      {showPanelsDialog && (
        <Dialog closeModalHandler={handleHidePanelsDialog} />
      )}
    </Container>
  );
};

const Container = styled.div``;

const LabelContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const RowTitleIcon = styled(Icon)`
  margin: 4px 0 0 5px;

  @media (max-width: 767px) {
    margin: 4px 0 0 5px;
  }
`;

const Label = styled.label`
  font-size: 18px;
  line-height: 1;
  letter-spacing: 0.3px;
  margin-bottom: 10px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
`;

const Option = styled(({ isSelected, optionsLength, ...restProps }) => (
  <div tabIndex={0} {...restProps} />
))`
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  line-height: 1.39;
  letter-spacing: 0.3px;
  width: calc(100% / ${(props) => props.optionsLength});
  border-left: none;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? '#041022' : '#999da3')};
  background-color: #ffffff;
  border: 1px solid #d6d7da;

  ${(props) =>
    props.isSelected &&
    `
      border: 2px solid #e7131a;
  `}
`;

export default SelectBoxes;
