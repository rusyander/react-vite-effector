import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
  UnmappedRouteObject,
} from 'atomic-router';
import {sample} from 'effector';
import {createBrowserHistory} from 'history';

import {appStarted} from './config/init';

export const routes = {
  search: createRoute(),
  auth: {
    register: createRoute(),
    login: createRoute(),
  },
};

const routesMap: UnmappedRouteObject<any>[] = [
  {
    path: '/register',
    route: routes.auth.register,
  },
  {
    path: '/login',
    route: routes.auth.login,
  },
  {
    path: '/search',
    route: routes.search,
  },
];

export const controls = createRouterControls();
export const router = createHistoryRouter({
  routes: routesMap,
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
