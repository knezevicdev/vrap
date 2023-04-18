import { useMemo } from 'react';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../store/store';
import calculateRequiredDocuments from './calculateRequiredDocuments';

const useRequiredDocuments = () => {
  const state = useVerificationStore(
    (state) => ({
      loanConfirmation: state.loanConfirmation,
      secondOwnerConfirmation: state.secondOwnerConfirmation,
      loanState: state.loanState,
    }),
    shallow
  );

  return useMemo(() => calculateRequiredDocuments(state), [state]);
};

export default useRequiredDocuments;
