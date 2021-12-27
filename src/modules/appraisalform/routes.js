import { matchRoutes } from 'react-router-config';

const routes = [];

export function appRouteExists(pathname) {
  const matchedRoutes = matchRoutes(routes, pathname).filter((route) => {
    // Ignore the wildcard route.
    if (route.match.path === '*') {
      return false;
    }
    // Consider only exact routes.
    // This will match URL params too.
    return route.match.isExact;
  });
  return matchedRoutes.length > 0;
}

export default routes;
