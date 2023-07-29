import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/index'
// @ts-ignore
import config from '#uora/config'

console.log(config)

const App = () => {
  return <Home></Home>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
