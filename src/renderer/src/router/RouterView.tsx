import { HashRouter, Route, Routes } from 'react-router-dom'

export type TRoute = {
  path: string
  component?: any
}

export const createRouterView = (router: TRoute[]) => {
  return (
    <HashRouter>
      <Routes>
        {router.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </HashRouter>
  )
}
