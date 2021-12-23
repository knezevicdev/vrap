import styled from 'styled-components';
import BaseButton from './BaseButton';

const PrimaryButton = styled(BaseButton)`
  color: ${props => props.theme.colors.white} !important;
  background-color: ${props => {
    const {
      disabled,
      theme: { colors },
      buttonColor = colors.vroomRed
    } = props;
    const disabledColor = colors.gray3;
    return disabled ? disabledColor : buttonColor;
  }};
  &:hover,
  &:focus {
    background-color: ${props => {
      const {
        disabled,
        theme: { colors },
        buttonColor = colors.happyRed
      } = props;
      const disabledColor = colors.gray3;
      return disabled ? disabledColor : buttonColor;
    }};
  }
`;

export default PrimaryButton;
