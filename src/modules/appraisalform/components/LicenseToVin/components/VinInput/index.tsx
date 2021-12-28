import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import { selectTheme } from '../../../../store/theme/selectors';
import VinInput from './VinInput';

const mapStateToProps = (state) => {
  return {
    theme: selectTheme(state),
  };
};

export default compose(withRouter, connect(mapStateToProps, null))(VinInput);
