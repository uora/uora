import config from 'internal:uora'
import { FC } from 'react'

const Home: FC = () => {
  return <div>Hello Uora {config.port}</div>
}

export default Home
