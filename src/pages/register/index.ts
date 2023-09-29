import {createRouteView} from 'atomic-router-react';

import {PageLoader} from '~/shared/ui';

import {ananimusRoute, currentRoute} from './model';
import {RegisterPage} from './page';

export const RegisterRoute = {
  view: createRouteView({route: ananimusRoute, view: RegisterPage, otherwise: PageLoader}),
  route: currentRoute,
};
