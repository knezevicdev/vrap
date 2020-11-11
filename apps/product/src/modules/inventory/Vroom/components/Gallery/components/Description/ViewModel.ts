import { DescriptionProps } from '.';

class DescriptionViewModel {
  readonly description: string;
  readonly image: string;

  constructor(props: DescriptionProps) {
    this.image = props.original;
    this.description = props.description;
  }
}

export default DescriptionViewModel;
