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
    e.stopPropagation();
    const safetyAndQuality = document.getElementById(
      'safety-and-quality-content'
    );
    const yOffset = -50;
    const y =
      (safetyAndQuality &&
        safetyAndQuality.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset) ||
      0;

    safetyAndQuality &&
      y !== 0 &&
      window.scrollTo({ top: y, behavior: 'smooth' });
  };
}

export default DescriptionViewModel;
