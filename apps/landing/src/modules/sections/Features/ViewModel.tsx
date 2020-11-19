import { ColumnType } from 'rc-table/lib/interface';
import React from 'react';

import Icon, { Icons } from '../../../core/Icon';
import { Body, Title } from '../../../core/Typography';

class FeaturesViewModel {
  readonly sectionTitle = 'trim details & features';
  readonly columns: ColumnType<{}>[] = [
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
      title: <Title.Three>Sport</Title.Three>,
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

  readonly checkmark = (<Icon icon={Icons.CHECKMARK} />);

  readonly data = [
    {
      key: 'Back–up camera',
      feature: 'Back–up camera',
      sport: this.checkmark,
      sportS: this.checkmark,
      rubicon: this.checkmark,
    },
    {
      key: 'Bluetooth voice commands',
      feature: 'Bluetooth voice commands',
      sport: this.checkmark,
      sportS: this.checkmark,
      rubicon: this.checkmark,
    },
    {
      key: 'Cruise control',
      feature: 'Cruise control',
      sport: this.checkmark,
      sportS: this.checkmark,
      rubicon: this.checkmark,
    },
    {
      key: 'Steering wheel audio controls',
      feature: 'Steering wheel audio controls',
      sport: this.checkmark,
      sportS: this.checkmark,
      rubicon: this.checkmark,
    },
    {
      key: 'USB/AUX ports',
      feature: 'USB/AUX ports',
      sport: this.checkmark,
      sportS: this.checkmark,
      rubicon: this.checkmark,
    },
    {
      key: 'Full size spare tire',
      feature: 'Full size spare tire',
      sport: this.checkmark,
      sportS: this.checkmark,
      rubicon: this.checkmark,
    },
    {
      key: 'Sunrider™ soft top',
      feature: 'Sunrider™ soft top',
      sport: this.checkmark,
      sportS: this.checkmark,
      rubicon: this.checkmark,
    },
    {
      key: 'Air conditioning',
      feature: 'Air conditioning',
      sport: this.checkmark,
      sportS: this.checkmark,
      rubicon: this.checkmark,
    },
    {
      key: 'Push start ignition',
      feature: 'Push start ignition',
      sport: this.checkmark,
      sportS: this.checkmark,
    },
    {
      key: '12v auxilary power outlet',
      feature: '12v auxilary power outlet',
      sport: this.checkmark,
      sportS: this.checkmark,
    },
    {
      key: 'Tilt/telescope steering column',
      feature: 'Tilt/telescope steering column',
      sport: this.checkmark,
      sportS: this.checkmark,
    },
    {
      key: 'All-season tires',
      feature: 'All-season tires',
      sport: this.checkmark,
      sportS: this.checkmark,
    },
    {
      key: 'Front floor mats',
      feature: 'Front floor mats',
      sport: this.checkmark,
      sportS: this.checkmark,
    },
    {
      key: 'Full length floor console',
      feature: 'Full length floor console',
      sport: this.checkmark,
      sportS: this.checkmark,
    },
    {
      key: 'UConnect 3 with 5" display',
      feature: 'UConnect 3 with 5" display',
      sport: this.checkmark,
      sportS: this.checkmark,
    },
    {
      key: 'Fog lights',
      feature: 'Fog lights',
      sportS: this.checkmark,
      rubicon: this.checkmark,
    },
    {
      key: 'Tire pressure monitoring system',
      feature: 'Tire pressure monitoring system',
      sport: this.checkmark,
    },
    { key: 'Apple CarPlay', feature: 'Apple CarPlay', rubicon: this.checkmark },
    { key: 'Android Audio', feature: 'Android Audio', rubicon: this.checkmark },
    {
      key: 'Remote keyless entry',
      feature: 'Remote keyless entry',
      rubicon: this.checkmark,
    },
    {
      key: 'Universal garage door opener',
      feature: 'Universal garage door opener',
      rubicon: this.checkmark,
    },
    {
      key: 'Leather steering wheel',
      feature: 'Leather steering wheel',
      rubicon: this.checkmark,
    },
    {
      key: 'Automatic temperature control',
      feature: 'Automatic temperature control',
      rubicon: this.checkmark,
    },
    {
      key: 'Off-road tires',
      feature: 'Off-road tires',
      rubicon: this.checkmark,
    },
    {
      key: 'One-touch-down power windows',
      feature: 'One-touch-down power windows',
      rubicon: this.checkmark,
    },
    {
      key: '115v power outlet',
      feature: '115v power outlet',
      rubicon: this.checkmark,
    },
    {
      key: 'UConnect 4 with 7" display',
      feature: 'UConnect 4 with 7" display',
      rubicon: this.checkmark,
    },
  ];
}

export default FeaturesViewModel;
