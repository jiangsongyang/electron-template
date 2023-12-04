import { def } from '@renderer/shared'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import type { NavigateOptions } from 'react-router-dom'

export const useRouter = <T extends string>() => {
  const navigate = useNavigate()
  const params = useParams<T>()
  const location = useLocation()

  /**  =============================== GET =========================================   */

  const getParams = () => params

  const getLocation = () => location

  const getSearchParams = <T extends string>(shouldDecode: boolean = false) => {
    const { location } = window
    const res: Record<T, string> = Object.create(null)
    const rowSearch = location.search.slice(1)
    if (rowSearch) {
      rowSearch.split('&').forEach((item) => {
        const tokenIndex = item.split('').findIndex((token) => token === '=')
        const k = item.slice(0, tokenIndex)
        const v = shouldDecode
          ? decodeURIComponent(item.slice(tokenIndex + 1))
          : item.slice(tokenIndex + 1)
        def(res, k, v)
      })
    }
    return res
  }
  /**  ============================= METHODS ========================================   */

  const to = (path: string, options: NavigateOptions = {}) => {
    const shouldAdd = !path.startsWith('/')
    navigate(`${shouldAdd ? '/' : ''}${path}`, options)
  }
  const back = (len: number = -1) => {
    navigate(len)
  }

  const open = (path: string) => {
    const { pathname } = getLocation()
    const { href } = window.location
    const origin = href.replace(pathname, '')

    const patchedPath = path.startsWith('/') ? path : `/${path}`
    const url = `${origin}${patchedPath}`

    window.open(url)
  }

  return {
    /** get  */
    getParams,
    getSearchParams,
    getLocation,
    /** router methods */
    to,
    back,
    open
  }
}
