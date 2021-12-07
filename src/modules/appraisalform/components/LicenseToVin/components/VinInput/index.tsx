import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import VinInput from './VinInput';
import { selectTheme } from '@app/store/theme/selectors';

const mapStateToProps = state => {
  return {
    theme: selectTheme(state)
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null
  )
)(VinInput);
