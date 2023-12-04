import { useRouter } from '@renderer/hooks'

export default () => {
  const { to } = useRouter()
  return <div onClick={() => to(`/`)}>this is setting</div>
}
