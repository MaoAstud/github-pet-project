import type { Repository, IGitHubService, IGitHubController } from "../interfaces/GitHubTypes"
import { GitHubService } from "../services/GitHubService"
import {
  filterRepositoriesByStars,
  sortRepositoriesByUpdatedDate,
  getLastNRepositories,
  calculateTotalStars,
} from "../services/GitHubService"

export class GitHubController implements IGitHubController {
  private gitHubService: IGitHubService

  constructor(gitHubService?: IGitHubService) {
    this.gitHubService = gitHubService || new GitHubService()
  }

  async getOrganizationRepositories(organization: string): Promise<Repository[]> {
    return await this.gitHubService.getOrganizationRepositories(organization)
  }

  getRepositoriesWithMoreThanNStars(repositories: Repository[], minStars: number): Repository[] {
    return filterRepositoriesByStars(repositories, minStars)
  }

  getLastNUpdatedRepositories(repositories: Repository[], count: number): Repository[] {
    const sortedRepos = sortRepositoriesByUpdatedDate(repositories)
    return getLastNRepositories(sortedRepos, count)
  }

  getTotalStars(repositories: Repository[]): number {
    return calculateTotalStars(repositories)
  }
}
