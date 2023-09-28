import {createRouteView} from 'atomic-router-react';

import {PageLoader} from '~/shared/ui';

import {currentRoute} from './model';
import {RegisterPage} from './page';

export const RegisterRoute = {
  view: RegisterPage,
  route: currentRoute,
};

// export const RegisterRoute = {
//   view: createRouteView({route: anonymousRoute, view: RegisterPage, otherwise: PageLoader}),
//   route: currentRoute,
// };
