### MultiStepForm Component

The purpose of this component is to create a wizard-like experience for our forms, breaking them down into sections.

### Required Props

1. formTitle - String; Title for your Multi Step Form ex: 'Multi-step form title'
2. sections - Collection; This is the meat of the props passed in, this is an array of each section you'll be passing to the form.
   Each section should contain a component, form, subTitle, and title.
   Component is the actual component you'll be rendered for that step.
   Form is the form supplied by the useForm custom hook
   SubTitle to title the form
   Title is to be a title for the whole section
   ex: {
   component: FirstInfoForm,
   form: firstForm,
   subTitle: 'Form 1',
   title: 'Section 1'
   }
3. onDone - Function that is executed once the final section is completed. Here is where any redux or API calls will take place
4. active - Integer that dictates which section is shown first; defaults to 0

### Example usage of MultiStepForm

<MultiStepForm
  formTitle="Multi-step form example"
  sections={sections}
  onDone={onSubmit}
  active={0}
/>

### Form Components

In the adjacent example.js file you'll see very simple Forms

ex:
const FirstInfoForm = ({ fields }) => (
<>
<FirstNameInput field={fields.first} />
<LastNameInput field={fields.last} />
<EmailInput field={fields.email} />
</>
);

The idea here is the actual forms, which will live as their own independent components, will do nothing but contain the HTML
for that section.
The Component piecing together the form will handle redux, state, and APIs (see FormMain in example.js)

### Unit Tests

Today we only have a snapshot test for this component since Enzyme/Jest/React doesn't yet support hooks, so once that happens
we'll have to come back to this component.
The tests we really _WANT_ for this component is the logic within the `handleOnNext` function.
Within `handleOnNext` we will want to test that the button updates to "Review" when the final section is active. We'll also
want to test that when clicking the button while on the final step we call `onDone`, and when we aren't on the final step we
just increment the activeSection state value.

### To view example.js

url: /multiformComponent
