import { connect } from 'react-redux';
import { compose } from 'recompose';

import { handleLicenseToVin } from '../../../../store/appraisal/operations';
import { showSpinner } from '../../../../store/common/actions';
import { showDialog } from '../../../../store/dialog/actions';
import { selectTheme } from '../../../../store/theme/selectors';
import { handleLicenseToVin as checkoutHandleLicenseToVin } from '../../../../store/views/operations';
import LicenseStateInput from './LicenseStateInput';

const mapStateToProps = (state) => {
  return {
    theme: selectTheme(state),
  };
};

const mapDispatchToProps = {
  handleLicenseToVin,
  checkoutHandleLicenseToVin,
  showSpinner,
  showDialog,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  LicenseStateInput
);
