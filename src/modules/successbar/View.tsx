import React from 'react';
import styled from 'styled-components';

import SuccessBarViewModel from './ViewModel';

import Icon, { Icons } from 'src/core/Icon';
import { Body } from 'src/core/Typography';

const SuccessBar = styled(Body.Regular)`
  padding: 15px 0 15px 0;
  text-align: center;
  width: 100%;
  background: #308406;
  color: #fff;
  font-weight: 500;
  display: inline-flex;
  justify-content: center;
`;

const WhiteCheck = styled(Icon)`
  margin: auto 10px auto 0;
  display: inline-block;
  vertical-align: middle;
`;

export interface Props {
  viewModel: SuccessBarViewModel;
}

const SuccessBarView: React.FC<Props> = ({ viewModel }) => {
  return (
    <SuccessBar>
      <WhiteCheck icon={Icons.CHECK_MARK_WHITE} />
      {viewModel.success}
    </SuccessBar>
  );
};

export default SuccessBarView;
