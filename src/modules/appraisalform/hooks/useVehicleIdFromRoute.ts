import { useRouter } from 'next/router';
import { useMemo } from 'react';

function useVehicleIdFromRoute() {
  const router = useRouter();

  return useMemo(() => router.query.vehicle as string, [router]);
}

export default useVehicleIdFromRoute;
