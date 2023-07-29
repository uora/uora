import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Home from './pages/index'

startTransition(() => {
  hydrateRoot(
    document.getElementById('root')!,
    <StrictMode>
      <Home />
    </StrictMode>,
  )
})
