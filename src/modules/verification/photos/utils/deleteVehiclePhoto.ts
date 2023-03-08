import axios from 'axios';

import { DocumentFileType } from './uploadVehiclePhoto';

export const deleteVehiclePhoto = async (
  vin: string,
  priceId: string,
  fileType: DocumentFileType
): Promise<boolean> => {
  try {
    await axios.delete(`/appraisal/api/photos/${vin}/delete`, {
      data: {
        image: `${priceId}-${fileType}.jpeg`,
      },
    });
  } catch (e) {
    return false;
  }

  return true;
};
