import Home from '../views/Home'
import { createRouterView } from './RouterView'
import type { TRoute } from './RouterView'

const routesList: TRoute[] = [
  {
    path: '/',
    component: Home
  }
]

export const createRouter = () => createRouterView(routesList)
