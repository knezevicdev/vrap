import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MultiTab = ({ tabSections, active = 0, className, theme }) => {
  const MultiTabTheme = theme;
  const [activeTab, setActiveTab] = useState(active);
  const tabWidth = 100 / tabSections.length;

  useEffect(
    () => {
      setActiveTab(active);
    },
    [active]
  );

  const handleTabClick = tabToOpen => {
    setActiveTab(tabToOpen);
  };

  const tabs = tabSections.map((tab, idx) => {
    const isActive = idx === activeTab;

    return (
      <MultiTabTheme.tabButton
        isActive={isActive}
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
      <MultiTabTheme.tabContentSection isActive={isActive} key={idx}>
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

MultiTab.propTypes = {
  tabSections: PropTypes.array.isRequired,
  active: PropTypes.number,
  className: PropTypes.string,
  theme: PropTypes.object
};

export default MultiTab;
