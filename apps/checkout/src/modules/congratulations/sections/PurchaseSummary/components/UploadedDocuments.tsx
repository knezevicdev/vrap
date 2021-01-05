import {
  Body,
  Icon,
  Icons,
  ThemeProps,
  Title,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

interface UploadedDocumentsProps {
  showInsuranceDisclaimer: boolean;
}

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

const UploadedDocuments: React.FC<UploadedDocumentsProps> = ({
  showInsuranceDisclaimer,
}) => {
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
      {showInsuranceDisclaimer ? (
        <Disclaimer>
          {`I don't have a car insurance available at this time. I understand that the insurance will be needed to complete the transaction.`}
        </Disclaimer>
      ) : (
        <IconAndText>
          <CheckmarkIcon icon={Icons.CHECKMARK_SMALL} />
          <Body.Regular>Insurance Card</Body.Regular>
        </IconAndText>
      )}
    </Container>
  );
};

export default UploadedDocuments;
