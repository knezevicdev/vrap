import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { handleLicenseToVin } from '@app/store/appraisal/operations';
import { handleLicenseToVin as checkoutHandleLicenseToVin } from '@app/store/views/operations';
import { showSpinner } from '@app/store/common/actions';
import { showDialog } from '@app/store/dialog/actions';
import LicenseStateInput from './LicenseStateInput';
import { selectTheme } from '@app/store/theme/selectors';

const mapStateToProps = state => {
  return {
    theme: selectTheme(state)
  };
};

const mapDispatchToProps = {
  handleLicenseToVin,
  checkoutHandleLicenseToVin,
  showSpinner,
  showDialog
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LicenseStateInput);
