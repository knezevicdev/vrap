import { deleteVerificationDocument } from '../utils/deleteVerificationDocument';
import { DocumentFileType } from '../utils/uploadVerificationDocument';

import { useAppStore } from 'src/context';

interface UseHandleDelete {
  handleDelete: (type: DocumentFileType) => () => Promise<boolean>;
}

const useHandleDelete = (priceId: string): UseHandleDelete => {
  const { store } = useAppStore();

  const handleDelete = (type: DocumentFileType) => async () => {
    try {
      const fileId = store.verification.documents?.find(
        (document) => document.fileType === type
      )?.id;
      if (!fileId) return false;
      const verificationKey = await deleteVerificationDocument(
        fileId,
        priceId,
        type
      );
      store.verification.getVerificationDetail(
        {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...store.verification.verificationDetail!,
          [verificationKey]: null,
        },
        store.verification.lastFourSSN
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return {
    handleDelete,
  };
};

export default useHandleDelete;
