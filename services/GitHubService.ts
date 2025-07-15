import axios, { type AxiosResponse } from "axios"
import type { Repository, IGitHubService } from "../interfaces/GitHubTypes"

export class GitHubService implements IGitHubService {
  private readonly baseURL = "https://api.github.com"
  private readonly axiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "GitHub-Pet-Project",
      },
    })
  }

  async getOrganizationRepositories(organization: string): Promise<Repository[]> {
    try {
      const response: AxiosResponse<Repository[]> = await this.axiosInstance.get(`/orgs/${organization}/repos`, {
        params: {
          type: "all",
          sort: "updated",
          direction: "desc",
          per_page: 100,
        },
      })

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`GitHub API Error: ${error.response?.status} - ${error.response?.statusText}`)
      }
      throw new Error("Failed to fetch repositories")
    }
  }
}

// Pure function utilities
export const filterRepositoriesByStars = (repositories: Repository[], minStars: number): Repository[] => {
  return repositories.filter((repo) => repo.stargazers_count > minStars)
}

export const sortRepositoriesByUpdatedDate = (repositories: Repository[]): Repository[] => {
  return [...repositories].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
}

export const getLastNRepositories = (repositories: Repository[], count: number): Repository[] => {
  return repositories.slice(0, count)
}

export const calculateTotalStars = (repositories: Repository[]): number => {
  return repositories.reduce((total, repo) => total + repo.stargazers_count, 0)
}
