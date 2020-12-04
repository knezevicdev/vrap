import React from 'react';

import ViewModel from './ViewModel';
import {Body, Title} from "vroom-ui/src/foundation/Typography";
import styled from "styled-components";
import Icon, {Icons} from "vroom-ui/src/elements/Icon/Icon";

interface Props {
  viewModel: ViewModel;
}
const Container = styled.div`
  display:flex;
  flex-direction: column;
`;

const IconAndText = styled.div`
  display: flex;
`;

const TitleHeader = styled(Title.One)`
    margin-bottom: 8px;
`;

const View: React.FC<Props> = () => {
  return (
      <Container>
        <TitleHeader>Uploaded documents</TitleHeader>
        <IconAndText>
          <Icon icon={Icons.CHECKMARK_SMALL}/>
          <Body.Regular>Front of Driver’s License</Body.Regular>
        </IconAndText>
        <IconAndText>
          <Icon icon={Icons.CHECKMARK_SMALL}/>
          <Body.Regular>Back of Driver’s License</Body.Regular>
        </IconAndText>
        <IconAndText>
          <Icon icon={Icons.CHECKMARK_SMALL}/>
          <Body.Regular>Insurance Card</Body.Regular>
        </IconAndText>
      </Container>
  );
};

export default View;
