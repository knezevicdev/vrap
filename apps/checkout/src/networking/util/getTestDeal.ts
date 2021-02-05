import getConfig from 'next/config';
import Router from 'next/router';

const { publicRuntimeConfig } = getConfig();

interface TestParameters {
  dealID?: number;
  dealStatus?: string[];
}

/**
 * Based on the env variable MockServer it will use the dealId or dealStatus from the URL for testing instead. Only on dev
 * example: checkout/module?testDealId=1
 * example: checkout/module?testDeal&testDealStatus="In-Progress"
 * example: checkout/module?testDealStatus="Pending"
 * @param dealID
 * @param dealStatus
 */
export const getTestDeal = (
  dealID?: number,
  dealStatus?: string[]
): TestParameters => {
  const { router } = Router;

  if (publicRuntimeConfig.mockServer && router && router.query) {
    const { testDealId, testDealStatus } = router.query;

    return {
      dealID: typeof testDealId === 'string' ? parseInt(testDealId) : undefined,
      dealStatus: typeof testDealStatus === 'string' ? [testDealStatus] : [],
    };
  }

  return {
    dealID,
    dealStatus,
  };
};
