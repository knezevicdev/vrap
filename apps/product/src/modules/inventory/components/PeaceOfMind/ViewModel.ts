import globalEnv from "src/globalEnv";

interface Step {
  description: string;
  title: string;
  img: {
    alt: string;
    src: string;
  }
}

class PeaceOfMindViewModel {
  readonly title: string = 'Peace of Mind';
  readonly steps: Step[] = [
    {
      img: {
        alt: 'Delivered to You Photo',
        src: `${globalEnv.ASSET_PREFIX}/modules/inventory/components/peaceofmind/delivered.png`,
      },
      title: 'Delivered to You',
      description:
        'Get this car shipped to your home or a convenient nearby location',
    },
    {
      img: {
        alt: 'Free Roadside Assistance Photo',
        src: `${globalEnv.ASSET_PREFIX}/modules/inventory/components/peaceofmind/roadside.png`,
      },
      title: 'Free Roadside Assistance',
      description:
        'Enjoy a full year of 24/7 roadside assistance. Exclusions may apply.',
    },
    {
      img: {
        alt: 'Free Limited Warranty Photo',
        src: `${globalEnv.ASSET_PREFIX}/modules/inventory/components/peaceofmind/warranty.png`,
      },
      title: 'Free Limited Warranty',
      description:
        'It’s good for 90 days or 6,000 miles. Exclusions may apply.',
    },
  ];
}

export default PeaceOfMindViewModel;
