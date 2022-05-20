import { Button as VroomButton, Icon } from '@vroom-web/ui-lib';
import styled from 'styled-components';

import { Line as SharedLine } from '../shared/Style.css';

export const DocUploadDesc = styled.p`
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  margin: 20px 0;
`;

export const FilesInfo = styled.p`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.25px;
  margin: 0;
`;

export const FilesInfoTitle = styled(FilesInfo)`
  margin-bottom: 5px;
`;

export const SecurityLogo = styled(Icon)`
  margin-right: 7px;
`;

export const SecureInfo = styled.p`
  font-size: 16px;
  letter-spacing: 0.43px;
  line-height: 20px;
  color: #308406;
  margin: 10px 0 0;
`;

export const SectionTitle = styled.h2`
  font-family: 'Calibre-Semibold', sans-serif;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
`;

export const Info = styled.p`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.25px;
  margin: 0 0 20px;
`;

export const Line = styled(SharedLine)`
  margin-top: 20px;
`;

export const Button = styled(VroomButton.Primary)`
  margin-top: 30px;
`;
