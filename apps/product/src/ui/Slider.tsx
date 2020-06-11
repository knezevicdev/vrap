import Slider, { SliderProps } from '@material-ui/core/Slider';
import withStyles from '@material-ui/core/styles/withStyles';

const StyledSlider = withStyles({
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '3px solid currentColor',
    marginTop: -11,
    marginLeft: -12,
    '&:hover': {
      backgroundColor: 'currentColor',
    },
  },
  track: {
    height: 4,
  },
  rail: {
    height: 4,
  },
})(Slider);

export type UISliderProps = SliderProps;
export default StyledSlider;
