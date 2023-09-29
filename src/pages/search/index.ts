import {createRouteView} from 'atomic-router-react';

import {PageLoader} from '~/shared/ui';

import {authorizedRoute, currentRoute} from './model';
import {SearchPage} from './page';

// const DataView = createRouteView({
//   route: recipesLoadRoute,
//   view: SearchPage,
//   otherwise: PageLoader,
// });

export const SearchRoute = {
  view: createRouteView({route: authorizedRoute, view: SearchPage, otherwise: PageLoader}),
  route: currentRoute,
};
