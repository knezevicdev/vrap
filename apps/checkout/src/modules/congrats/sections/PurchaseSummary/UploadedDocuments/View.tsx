import React from 'react';
import styled from 'styled-components';
import Icon, { Icons } from 'vroom-ui/src/elements/Icon/Icon';
import { ThemeProps } from 'vroom-ui/src/foundation/themes/types';
import { Body, Title } from 'vroom-ui/src/foundation/Typography';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const secondarySuccess = (props: { theme: ThemeProps }): string =>
  props.theme.colors.secondary.success;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconAndText = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 8px;
`;

const TitleHeader = styled(Title.One)`
  margin-bottom: 8px;
`;

const CheckmarkIcon = styled(Icon)`
  margin-right: 8px;
  fill: ${secondarySuccess};
`;

const View: React.FC<Props> = () => {
  return (
    <Container>
      <TitleHeader>Uploaded documents</TitleHeader>
      <IconAndText>
        <CheckmarkIcon icon={Icons.CHECKMARK_SMALL} />
        <Body.Regular>Front of Driver’s License</Body.Regular>
      </IconAndText>
      <IconAndText>
        <CheckmarkIcon icon={Icons.CHECKMARK_SMALL} />
        <Body.Regular>Back of Driver’s License</Body.Regular>
      </IconAndText>
      <IconAndText>
        <CheckmarkIcon icon={Icons.CHECKMARK_SMALL} />
        <Body.Regular>Insurance Card</Body.Regular>
      </IconAndText>
    </Container>
  );
};

export default View;
