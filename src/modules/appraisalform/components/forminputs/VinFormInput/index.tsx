import { connect } from 'react-redux';

import { showDialog } from '../../../store/dialog/actions';
import VinFormInput from './VinFormInput';

const mapDispatchToProps = (dispatch) => {
  return {
    showDialog: (dialogType) => dispatch(showDialog(dialogType)),
  };
};

export default VinFormInput;
