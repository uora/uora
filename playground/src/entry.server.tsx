import { renderToPipeableStream } from 'react-dom/server'
import { PassThrough } from 'stream'
import Home from './pages/index'

export default function handleRequest(req: any, res: any) {
  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(<Home />, {
      onAllReady() {
        const body = new PassThrough()

        res.set('Content-Type', 'text/html')

        resolve(body)

        pipe(body)
      },
      onShellError(error: unknown) {
        reject(error)
      },
      onError(error: unknown) {
        // responseStatusCode = 500;
        console.error(error)
      },
    })
  })
}
