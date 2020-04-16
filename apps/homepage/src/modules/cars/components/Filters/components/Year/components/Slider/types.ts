import SliderViewModel from './ViewModel';

import { UISliderProps } from 'src/ui/Slider';

export interface SliderProps extends UISliderProps {
  state: number[];
  onDone: (values: number[]) => void;
}

export interface SliderViewProps extends SliderProps {
  viewModel: SliderViewModel;
}
