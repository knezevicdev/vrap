import { connect } from 'react-redux';
import { compose } from 'recompose';

import { selectTheme } from '../../../../store/theme/selectors';
import VinInput from './VinInput';

const mapStateToProps = (state) => {
  return {
    theme: selectTheme(state),
  };
};

export default compose(connect(mapStateToProps, null))(VinInput);
