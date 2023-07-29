import { logger } from '../node/utils/logger'

export class Router {
  public readonly root: string
  constructor({ root }: { root: string }) {
    this.root = root
  }

  async routes() {
    const routes: any[] = []

    logger.debug(routes)
    return routes
  }

  public async printRoutes() {
    const routes = await this.routes()
    logger.debug(routes)
  }
}
