import { createRouterView } from './RouterView'

import type { TRoute } from './RouterView'

import Home from '../views/Home'
import Setting from '../views/Setting'

const routesList: TRoute[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/setting',
    component: Setting
  }
]

export const createRouter = () => createRouterView(routesList)
