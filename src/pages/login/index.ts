import {createRouteView} from 'atomic-router-react';

import {PageLoader} from '~/shared/ui';

import {ananimusRoute, currentRoute} from './model';
import {LoginPage} from './page';

export const LoginRoute = {
  view: createRouteView({route: ananimusRoute, view: LoginPage, otherwise: PageLoader}),
  route: currentRoute,
};
