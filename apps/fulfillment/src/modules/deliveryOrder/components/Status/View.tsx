import Step from '@material-ui/core/Step';
import MuiStepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { styled } from '@material-ui/core/styles';
import { Container, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const StepButton = styled(MuiStepButton)(() => ({
  color: 'grey',
}));

interface Props {
  viewModel: ViewModel;
}

const StatusView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <Stepper nonLinear activeStep={viewModel.active}>
        {viewModel.statuses.map((item) => (
          <Step key={item.label}>
            <StepButton completed={item.complete}>
              <Typography variant="body1" color="text.primary" component="span">
                {item.label}
              </Typography>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default StatusView;
