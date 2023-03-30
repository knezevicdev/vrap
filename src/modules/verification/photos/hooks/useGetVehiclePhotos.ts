import axios from 'axios';
import getConfig from 'next/config';
import { useCallback, useEffect, useState } from 'react';

import { DocumentFileType } from '../utils/uploadVehiclePhoto';

const { publicRuntimeConfig } = getConfig();

type ImagesResponse = {
  name: string;
  timestamp: number;
  uploaderType: 'verification' | 'vip';
}[];

type UseGetVehiclePhotos = {
  data: Partial<Record<DocumentFileType, string>>;
  loading: boolean;
  error: Error | null | unknown;
  refetch: () => Promise<void>;
};

function useGetVehiclePhotos(
  priceId: string,
  vin?: string
): UseGetVehiclePhotos {
  const url = `/appraisal/api/photos/${vin}`;
  const [data, setData] = useState<Partial<Record<DocumentFileType, string>>>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null | unknown>(null);

  const processAndSetData = useCallback(
    (data: ImagesResponse) => {
      setData(
        data
          .filter((image) => image.name.startsWith(priceId))
          .reduce((res, image) => {
            const type = image.name.replace(/\.[^/.]+$/, '').split('-')[1];

            return {
              ...res,
              [type]: `${publicRuntimeConfig.VAST_IMAGE_PROXY_URL}/${vin}/verification/${image.name}`,
            };
          }, {}) as Partial<Record<DocumentFileType, string>>
      );
    },
    [priceId, vin]
  );

  useEffect(() => {
    if (!vin) return;
    async function fetchData() {
      try {
        const response = await axios.post<ImagesResponse>(url);
        processAndSetData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [processAndSetData, url, vin]);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post<ImagesResponse>(url);
      processAndSetData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [processAndSetData, url]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

export default useGetVehiclePhotos;
