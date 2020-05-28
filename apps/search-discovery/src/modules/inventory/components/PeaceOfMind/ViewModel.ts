interface Step {
  description: string;
  title: string;
}

class PeaceOfMindViewModel {
  readonly title: string = 'Peace of Mind';
  readonly steps: Step[] = [
    {
      title: 'Delivered to You',
      description:
        'Get this car shipped to your home or a convenient nearby location',
    },
    {
      title: 'Free Roadside Assistance',
      description:
        'Enjoy a full year of 24/7 roadside assistance. Exclusions may apply.',
    },
    {
      title: 'Free Limited Warranty',
      description:
        'It’s good for 90 days or 6,000 miles. Exclusions may apply.',
    },
  ];
}

export default PeaceOfMindViewModel;
