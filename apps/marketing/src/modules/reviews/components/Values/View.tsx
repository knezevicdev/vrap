import { styled, Tab, Tabs, Theme } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import React, { ChangeEvent, FC, useState } from 'react';

import TabPanel from './TabPanel';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')((props: { theme: Theme; src: string }) => ({
  backgroundImage: `url(${props.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: props.theme.spacing(10),
  [props.theme.breakpoints.down('md')]: {
    padding: props.theme.spacing(2),
  },
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.paper,
  width: '80%',
  minHeight: '420px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    width: '100%',
  },
  [theme.breakpoints.down('xs')]: {
    minHeight: '600px',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  letterSpacing: '1px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '42px',
    lineHeight: '46px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
    lineHeight: '32px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '28px',
    lineHeight: '32px',
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '25px',
  textAlign: 'center',
  letterSpacing: '0.25px',
  marginBottom: theme.spacing(2),
  width: '60%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const TabSection = styled('div')(() => ({
  width: '100%',
  '& .MuiTabScrollButton-root': {
    width: '15px',
  },
}));

const TabHeader = styled(Tab)(({ theme }) => ({
  flex: 1,
  textTransform: 'capitalize',
  fontSize: '18px',
  lineHeight: '25px',
  letterSpacing: '0.25px',
  borderBottom: `1px solid ${theme.palette.grey.A100}`,
  [theme.breakpoints.down('sm')]: {
    flex: 'none',
  },
}));

const ValuesView: FC<Props> = ({ viewModel }) => {
  const {
    title,
    subtitle,
    bgImage,
    beforeTagline,
    afterTagline,
    tabs,
  } = viewModel;
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Container src={bgImage}>
      <Content>
        <Title variant="h2">{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <TabSection>
          <div>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons="on"
            >
              {tabs.map((tab) => (
                <TabHeader label={tab.title} key={tab.key} />
              ))}
            </Tabs>
          </div>
          {tabs.map((tab, index) => (
            <TabPanel
              tab={tab}
              value={value}
              index={index}
              key={tab.key}
              beforeTagline={beforeTagline}
              afterTagline={afterTagline}
            />
          ))}
        </TabSection>
      </Content>
    </Container>
  );
};

export default ValuesView;
