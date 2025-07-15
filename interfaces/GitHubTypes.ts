export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  created_at: string
  pushed_at: string
  size: number
  open_issues_count: number
  topics: string[]
  visibility: string
  default_branch: string
}

export interface GitHubApiResponse {
  repositories: Repository[]
  total_count?: number
}

export interface IGitHubService {
  getOrganizationRepositories(organization: string): Promise<Repository[]>
}

export interface IGitHubController {
  getOrganizationRepositories(organization: string): Promise<Repository[]>
  getRepositoriesWithMoreThanNStars(repositories: Repository[], minStars: number): Repository[]
  getLastNUpdatedRepositories(repositories: Repository[], count: number): Repository[]
  getTotalStars(repositories: Repository[]): number
}
