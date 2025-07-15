import type { Repository, IGitHubService } from "../interfaces/GitHubTypes"
import { mockRepositories } from "../__tests__/fixtures/mockRepositories"

export class MockGitHubService implements IGitHubService {
  async getOrganizationRepositories(organization: string): Promise<Repository[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (organization === "stackbuilders") {
      return mockRepositories
    }

    throw new Error(`Organization ${organization} not found`)
  }
}
