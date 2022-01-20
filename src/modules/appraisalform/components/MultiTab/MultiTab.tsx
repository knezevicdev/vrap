import React, { useEffect, useState } from 'react';

import { GenericObject } from '../../../../interfaces.d';

interface Props {
  tabSections: GenericObject[];
  active?: number;
  className?: string;
  theme: any;
}

const MultiTab: React.FC<Props> = ({
  tabSections,
  active = 0,
  className,
  theme,
}) => {
  const MultiTabTheme = theme;
  const [activeTab, setActiveTab] = useState(active);
  const tabWidth = 100 / tabSections.length;

  useEffect(() => {
    setActiveTab(active);
  }, [active]);

  const handleTabClick = (tabToOpen: number) => {
    setActiveTab(tabToOpen);
  };

  const tabs = tabSections.map((tab, idx) => {
    const isActive = idx === activeTab;

    return (
      <MultiTabTheme.tabButton
        isactive={isActive}
        key={idx}
        tabWidth={tabWidth}
        onClick={() => handleTabClick(idx)}
        data-qa={tab.title}
      >
        {tab.title}
      </MultiTabTheme.tabButton>
    );
  });

  const tabComponents = tabSections.map((tab, idx) => {
    const CurrentTab = tab.component;
    const isActive = idx === activeTab;

    return (
      <MultiTabTheme.tabContentSection isactive={isActive} key={idx}>
        <CurrentTab {...tab.props} handleTabClick={handleTabClick} />
      </MultiTabTheme.tabContentSection>
    );
  });

  return (
    <MultiTabTheme className={className}>
      <MultiTabTheme.tabs>{tabs}</MultiTabTheme.tabs>
      <MultiTabTheme.body>{tabComponents}</MultiTabTheme.body>
    </MultiTabTheme>
  );
};

export default MultiTab;
