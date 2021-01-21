import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class StyledHowItWorksViewModel {
  readonly title = `how it works`;
  readonly button = {
    label: `LEARN MORE`,
    link: `/how-it-works`,
  };
  readonly sections = [
    {
      icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/browse.svg`,
      heading: 'Browse Online',
      description:
        'Explore thousands of vehicles with new inventory added every week.',
    },
    {
      icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/make-it-yours.svg`,
      heading: 'Make It Yours',
      description:
        'Find the one, choose your financing, appraise your trade and sign.',
    },
    {
      icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/get-it-delivered.svg`,
      heading: 'Get It Delivered',
      description:
        'Take delivery right at home, make sure the car is right for you and enjoy.',
    },
  ];
}

export default StyledHowItWorksViewModel;
