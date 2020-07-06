import globalEnv from 'src/globalEnv';
class ConditionEndViewModel {
  readonly bodyText: string = `Our vehicles look nice but they aren’t perfect. We make our best effort to fix anything outside of normal wear and tear. Here’s some things you can expect from Vroom. We:`;
  readonly bullets = [
    'Fix all scratches longer than 6 inches.',
    'Touch up all paint chips.',
    'Fix all dents larger than a dime.',
    'Repair any windshield chips - or if there are more than three chips, we replace the windshield.',
  ];

  readonly faqPreText: string =
    'For information on our mechanical and safety standards, ';
  readonly faqLink = {
    text: 'please visit out FAQ.',
    url: `https://vroom.zendesk.com/hc/en-us/articles/205360495-How-do-you-ensure-the-quality-of-your-vehicles-`,
  };
  readonly defaultImage = {
    alt: 'Condition End Photo',
    src: `${globalEnv.ASSET_PREFIX}/modules/inventory/components/gallery/LastCondition.png`,
  };
}

export default ConditionEndViewModel;
