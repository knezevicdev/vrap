### MultiTab Component

The purpose of this component is to create an easy to use component that renders a tabbed component

### Required Props

1. tabSections - Collection; this is an array of each tab you'll be passing to the component.
   Each tabSection should contain a component and title.
   Component is the actual component you'll be rendered for that step.
   Prop is if your tab requires any custom props; some cases might include something else on the page changing tab data
   Title is to be a title for the whole section
   ex: {
   component: FirstInfoTab,
   props: { text: 'custom text' },
   title: 'Section 1'
   }
2. active - Integer that dictates which tab is shown first; defaults to 0

### Example usage of MultiTab

<MultiTab
  tabSections={tabSections}
  active={0}
/>

### Unit Tests

As of now there is a snapshot test written, so far I don't see a need for any more but as this component extends we should also extend the tests

### To view example.js - after adding it to src/routes.js

url: /multiTabComponent
