import Table from 'rc-table';
import { ColumnType } from 'rc-table/lib/interface';
import React from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../../atoms/Icon/Icon';
import { Body, Hero, Title } from '../../atoms/Typography';

const columns: ColumnType<{}>[] = [
  {
    title: '',
    dataIndex: 'feature',
    key: 'feature',
    fixed: 'left',
    render: (value: string): { children: JSX.Element } => {
      return {
        children: <Body.Small>{value}</Body.Small>,
      };
    },
  },
  {
    title: <Title.Three>Sport S</Title.Three>,
    dataIndex: 'sport',
    key: 'sport',
  },
  {
    title: <Title.Three>Sport S</Title.Three>,
    dataIndex: 'sportS',
    key: 'sportS',
  },
  {
    title: <Title.Three>Rubicon</Title.Three>,
    dataIndex: 'rubicon',
    key: 'rubicon',
  },
];

const checkmark = <Icon icon={Icons.CHECKMARK} />;

const data = [
  {
    key: 'Back–up camera',
    feature: 'Back–up camera',
    sport: checkmark,
    sportS: checkmark,
    rubicon: checkmark,
  },
  {
    key: 'Bluetooth voice commands',
    feature: 'Bluetooth voice commands',
    sport: checkmark,
    sportS: checkmark,
    rubicon: checkmark,
  },
  {
    key: 'Cruise control',
    feature: 'Cruise control',
    sport: checkmark,
    sportS: checkmark,
    rubicon: checkmark,
  },
  {
    key: 'Steering wheel audio controls',
    feature: 'Steering wheel audio controls',
    sport: checkmark,
    sportS: checkmark,
    rubicon: checkmark,
  },
  {
    key: 'USB/AUX ports',
    feature: 'USB/AUX ports',
    sport: checkmark,
    sportS: checkmark,
    rubicon: checkmark,
  },
  {
    key: 'Full size spare tire',
    feature: 'Full size spare tire',
    sport: checkmark,
    sportS: checkmark,
    rubicon: checkmark,
  },
  {
    key: 'Sunrider™ soft top',
    feature: 'Sunrider™ soft top',
    sport: checkmark,
    sportS: checkmark,
    rubicon: checkmark,
  },
  {
    key: 'Air conditioning',
    feature: 'Air conditioning',
    sport: checkmark,
    sportS: checkmark,
    rubicon: checkmark,
  },
  {
    key: 'Push start ignition',
    feature: 'Push start ignition',
    sport: checkmark,
    sportS: checkmark,
  },
  {
    key: '12v auxilary power outlet',
    feature: '12v auxilary power outlet',
    sport: checkmark,
    sportS: checkmark,
  },
  {
    key: 'Tilt/telescope steering column',
    feature: 'Tilt/telescope steering column',
    sport: checkmark,
    sportS: checkmark,
  },
  {
    key: 'All-season tires',
    feature: 'All-season tires',
    sport: checkmark,
    sportS: checkmark,
  },
  {
    key: 'Front floor mats',
    feature: 'Front floor mats',
    sport: checkmark,
    sportS: checkmark,
  },
  {
    key: 'Full length floor console',
    feature: 'Full length floor console',
    sport: checkmark,
    sportS: checkmark,
  },
  {
    key: 'UConnect 3 with 5" display',
    feature: 'UConnect 3 with 5" display',
    sport: checkmark,
    sportS: checkmark,
  },
  {
    key: 'Fog lights',
    feature: 'Fog lights',
    sportS: checkmark,
    rubicon: checkmark,
  },
  {
    key: 'Tire pressure monitoring system',
    feature: 'Tire pressure monitoring system',
    sport: checkmark,
  },
  { key: 'Apple CarPlay', feature: 'Apple CarPlay', rubicon: checkmark },
  { key: 'Android Audio', feature: 'Android Audio', rubicon: checkmark },
  {
    key: 'Remote keyless entry',
    feature: 'Remote keyless entry',
    rubicon: checkmark,
  },
  {
    key: 'Universal garage door opener',
    feature: 'Universal garage door opener',
    rubicon: checkmark,
  },
  {
    key: 'Leather steering wheel',
    feature: 'Leather steering wheel',
    rubicon: checkmark,
  },
  {
    key: 'Automatic temperature control',
    feature: 'Automatic temperature control',
    rubicon: checkmark,
  },
  { key: 'Off-road tires', feature: 'Off-road tires', rubicon: checkmark },
  {
    key: 'One-touch-down power windows',
    feature: 'One-touch-down power windows',
    rubicon: checkmark,
  },
  {
    key: '115v power outlet',
    feature: '115v power outlet',
    rubicon: checkmark,
  },
  {
    key: 'UConnect 4 with 7" display',
    feature: 'UConnect 4 with 7" display',
    rubicon: checkmark,
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
`;

const CustomTable = styled(Table)`
  position: relative;

  table {
    border-spacing: 0;
  }

  .rc-table-sticky-header {
    position: sticky;
    background: white;
    top: 56px !important;
  }

  .rc-table-body {
    overflow-x: auto;
  }

  @media (min-width: 600px) and (max-width: 839px) {
    margin: 0px 64px;
  }
`;

const HeaderWrapper = styled.thead`
  tr {
    height: 36px;

    th:not(:last-child) {
      box-shadow: 1px 0 0 0 #f5f5f5;
    }

    th:first-child {
      min-width: 144px;
      background: white;
    }

    th:not(:first-child) {
      min-width: 112px;
      max-width: 122px;
    }
  }
`;

const BodyWrapper = styled.tbody`
  tr {
    height: 36px;

    td:first-child {
      min-width: 144px;
      width: 100%;
      z-index: -1;
    }

    td:not(:first-child) {
      min-width: 112px;
      max-width: 122px;
      text-align: center;
      z-index: -2;
      position: relative;
    }

    :nth-child(odd) > td {
      background: #f5f5f5;
    }

    :nth-child(even) > td {
      background: white;
    }

    td:not(:last-child) {
      box-shadow: 1px 0 0 0 #f5f5f5;
    }
  }
`;

const SectionTitle = styled(Hero.Four)`
  @media (min-width: 600px) and (max-width: 839px) {
    margin: 0px 64px 16px 64px;
  }

  @media (max-width: 599px) {
    margin: 0px 24px 16px 24px;
  }
`;

const components = {
  header: {
    wrapper: HeaderWrapper,
  },
  body: {
    wrapper: BodyWrapper,
  },
};

export const Features: React.FC = () => {
  return (
    <Container>
      <SectionTitle>Trim details & features</SectionTitle>
      <CustomTable
        sticky
        columns={columns}
        data={data}
        components={components}
      />
    </Container>
  );
};
