import { styled } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import PhoneIcon from '@material-ui/icons/Phone';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto', 4, 'auto'),
  maxWidth: '1280px',
  width: '100%',
  padding: theme.spacing(0, 3),
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: `1px solid ${theme.palette.grey.A100}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  '& .bold': {
    fontWeight: 600,
  },
}));

const Body = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
}));

const BoxLeft = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirectiopn: 'row',
  border: `1px solid ${theme.palette.grey.A100}`,
  width: '50%',
  padding: theme.spacing(4),
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginRight: 0,
    marginBottom: theme.spacing(2),
  },
}));

const BoxRight = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirectiopn: 'row',
  border: `1px solid ${theme.palette.grey.A100}`,
  width: '50%',
  padding: theme.spacing(4),
  marginLeft: theme.spacing(2),
  [theme.breakpoints.down('sm')]: { width: '100%', marginLeft: 0 },
}));

const BoxTitle = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  fontWeight: 600,
}));

const BoxContent = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}));

const BodyBody = styled(Typography)(() => ({
  lineHeight: 'normal',
}));

const StyledHelpIcon = styled(HelpIcon)(({ theme }) => ({
  height: '80px',
  width: '80px',
  color: theme.palette.grey['A100'],
}));

const StyledPhoneIcon = styled(PhoneIcon)(({ theme }) => ({
  height: '80px',
  width: '80px',
  color: theme.palette.grey['A100'],
}));

interface Props {
  viewModel: ViewModel;
}

const NeedHelpView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <Content>
        <Typography variant="h2" fontWeight="fontWeightMedium">
          {viewModel.title}
        </Typography>
        <Subtitle>{viewModel.subtitle}</Subtitle>
        <Body>
          <BoxLeft>
            <StyledHelpIcon />
            <BoxContent>
              <BoxTitle>{viewModel.faq.title}</BoxTitle>
              <BodyBody>
                <ExternalLink href={viewModel.faq.href} target="_blank">
                  {viewModel.faq.hrefText}
                </ExternalLink>
                {viewModel.faq.body}
              </BodyBody>
            </BoxContent>
          </BoxLeft>
          <BoxRight>
            <StyledPhoneIcon />
            <BoxContent>
              <BoxTitle>{viewModel.call.title}</BoxTitle>
              <BodyBody>{viewModel.call.body}</BodyBody>
            </BoxContent>
          </BoxRight>
        </Body>
      </Content>
    </Container>
  );
};

export default NeedHelpView;
