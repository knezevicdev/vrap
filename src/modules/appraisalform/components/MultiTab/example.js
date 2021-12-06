import React from 'react';
import PropTypes from 'prop-types';
import MultiTab from './';

export const FirstInfoTab = () => (
  <>
    <span>tab 1</span>
  </>
);

export const SecondInfoTab = ({ props }) => (
  <>
    <span>tab 2</span>
    {props.text}
  </>
);

const TabMain = () => {
  const tabSections = [
    {
      component: FirstInfoTab,
      title: 'tab 1'
    },
    {
      component: SecondInfoTab,
      props: { text: 'passed in custom prop' },
      title: 'tab 2'
    }
  ];

  return <MultiTab tabSections={tabSections} active={0} />;
};

SecondInfoTab.propTypes = {
  props: PropTypes.object,
  text: PropTypes.string
};

export default TabMain;
