import { styled } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import React from 'react';

interface Tab {
  key: number;
  title: string;
  beforeTitle: string;
  beforeDesc: string;
  afterTitle: string;
  afterDesc: string;
}

interface Props {
  value: number;
  index: number;
  beforeTagline: string;
  afterTagline: string;
  tab: Tab;
}

const TabPanelContent = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(4),
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: `${theme.spacing(2)}px`,
  [theme.breakpoints.down('xs')]: {
    gridTemplateColumns: '1fr',
  },
}));

const TabPanelColumn = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: `${theme.spacing(1)}px`,
}));

const TagLine = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  lineHeight: '12px',
  letterSpacing: '1.25px',
  textTransform: 'uppercase',
  color: theme.palette.grey[500],
}));

const PanelTitle = styled(Typography)(() => ({
  fontSize: '18px',
  lineHeight: '25px',
  letterSpacing: '0.25px',
}));

const PanelDesc = styled(Typography)(() => ({
  fontSize: '16px',
  lineHeight: '25px',
  letterSpacing: '0.25px',
}));

const TabPanel: React.FC<Props> = ({
  value,
  index,
  beforeTagline,
  afterTagline,
  tab,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
    >
      {value === index && (
        <TabPanelContent>
          <TabPanelColumn>
            <TagLine fontWeight={600}>{beforeTagline}</TagLine>
            <PanelTitle fontWeight={600}>{tab.beforeTitle}</PanelTitle>
            <PanelDesc>{tab.beforeDesc}</PanelDesc>
          </TabPanelColumn>
          <TabPanelColumn>
            <TagLine fontWeight={600}>{afterTagline}</TagLine>
            <PanelTitle fontWeight={600}>{tab.afterTitle}</PanelTitle>
            <PanelDesc>{tab.afterDesc}</PanelDesc>
          </TabPanelColumn>
        </TabPanelContent>
      )}
    </div>
  );
};

export default TabPanel;
