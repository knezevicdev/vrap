import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { trackPanelsTooltip } from '../lib/analytics/sell';
import tooltip_icon from '../static/icons/svg/tooltip.svg';
import { showDialog } from '../store/dialog/actions';
import Icon from './Icon';

const SelectBoxes = ({
  field: { options, onClick, value, label, panelsTooltip },
  handlePanelTooltipClick,
  className,
  externalLabel,
}) => {
  return (
    <Container className={className}>
      {externalLabel || (
        <LabelContainer>
          <Label>{label}</Label>
          {panelsTooltip && (
            <RowTitleIcon
              id={tooltip_icon}
              onClick={() => {
                trackPanelsTooltip(panelsTooltip);
                handlePanelTooltipClick();
              }}
            />
          )}
        </LabelContainer>
      )}
      <OptionsContainer data-qa="SelectBoxesComponent">
        {options.map((item) => {
          return (
            <Option
              isSelected={value === item}
              key={item}
              onClick={() => onClick(item)}
              optionsLength={options.length}
              data-qa={item}
            >
              {item}
            </Option>
          );
        })}
      </OptionsContainer>
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
  <div {...restProps} />
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

Option.propTypes = {
  isSelected: PropTypes.bool,
  optionsLength: PropTypes.number,
};

SelectBoxes.propTypes = {
  props: PropTypes.object,
  field: PropTypes.object,
  className: PropTypes.string,
  externalLabel: PropTypes.string,
  handlePanelTooltipClick: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  handlePanelTooltipClick: () => dispatch(showDialog('PanelsDialog', {}, true)),
});

export default SelectBoxes;
