import { MaxAndMin } from '../../../../../../util';
import SliderViewModel from './ViewModel';

import { UISliderProps } from 'src/ui/Slider';

export interface SliderProps extends UISliderProps {
  state: MaxAndMin;
  onDone: (price: MaxAndMin) => void;
}

export interface SliderViewProps extends SliderProps {
  viewModel: SliderViewModel;
}
