import { connect } from 'react-redux';
import VinFormInput from './VinFormInput';
import { showDialog } from '@app/store/dialog/actions';

const mapDispatchToProps = dispatch => {
  return {
    showDialog: dialogType => dispatch(showDialog(dialogType))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(VinFormInput);
