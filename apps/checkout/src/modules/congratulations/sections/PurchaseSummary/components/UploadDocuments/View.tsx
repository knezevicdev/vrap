import {
  Body,
  Icon,
  Icons,
  ThemeProps,
  Title,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

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

const Disclaimer = styled(Body.Regular)`
  padding: 8px;
  margin-top: 16px;
  border: solid 1px ${primaryBrand};
`;

interface Props {
  viewModel: ViewModel;
}

const View = ({ viewModel }: Props): JSX.Element => {
  const {
    title,
    documents,
    showInsuranceDisclaimer,
    disclaimer,
    getFileName,
  } = viewModel;
  return (
    <Container>
      <TitleHeader>{title}</TitleHeader>
      {documents.map(
        (document, idx): React.ReactNode => (
          <IconAndText key={idx}>
            <CheckmarkIcon icon={Icons.CHECKMARK_SMALL} />
            <Body.Regular>{getFileName(document.fileType)}</Body.Regular>
          </IconAndText>
        )
      )}
      {showInsuranceDisclaimer && <Disclaimer>{disclaimer}</Disclaimer>}
    </Container>
  );
};

export default View;
