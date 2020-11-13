import { DescriptionProps } from '.';

class DescriptionViewModel {
  readonly description: string;
  readonly image: string;

  constructor(props: DescriptionProps) {
    this.image = props.original;
    this.description = props.description;
  }

  scrollToSafetyAndQuality = (e: React.ChangeEvent<{}>): void => {
    e.preventDefault();
    const safetyAndQuality = document.getElementById(
      'safety-and-quality-content'
    );
    safetyAndQuality?.scrollIntoView({ behavior: 'smooth' });
  };
}

export default DescriptionViewModel;
