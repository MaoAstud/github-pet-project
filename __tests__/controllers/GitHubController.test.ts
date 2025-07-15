import { describe, it, expect, beforeEach } from "vitest"
import { GitHubController } from "../../controllers/GitHubController"
import { MockGitHubService } from "../../services/MockGitHubService"
import { mockRepositories } from "../fixtures/mockRepositories"
import type { IGitHubService } from "../../interfaces/GitHubTypes"

describe("GitHubController", () => {
  let controller: GitHubController
  let mockService: IGitHubService

  beforeEach(() => {
    mockService = new MockGitHubService()
    controller = new GitHubController(mockService)
  })

  describe("getOrganizationRepositories", () => {
    it("should fetch repositories from the service", async () => {
      const result = await controller.getOrganizationRepositories("stackbuilders")

      expect(result).toEqual(mockRepositories)
      expect(result).toHaveLength(6)
    })

    it("should throw error for non-existent organization", async () => {
      await expect(controller.getOrganizationRepositories("non-existent-org")).rejects.toThrow(
        "Organization non-existent-org not found",
      )
    })
  })

  describe("getRepositoriesWithMoreThanNStars", () => {
    it("should return repositories with more than 5 stars", () => {
      const result = controller.getRepositoriesWithMoreThanNStars(mockRepositories, 5)

      expect(result).toHaveLength(4)
      expect(result.every((repo) => repo.stargazers_count > 5)).toBe(true)
    })

    it("should return repositories with more than 10 stars", () => {
      const result = controller.getRepositoriesWithMoreThanNStars(mockRepositories, 10)

      expect(result).toHaveLength(3)
      expect(result.map((repo) => repo.name)).toEqual(["haskell-project", "react-components", "python-tools"])
    })
  })

  describe("getLastNUpdatedRepositories", () => {
    it("should return last 5 updated repositories", () => {
      const result = controller.getLastNUpdatedRepositories(mockRepositories, 5)

      expect(result).toHaveLength(5)
      expect(result[0].name).toBe("haskell-project") // Most recently updated
      expect(result[4].name).toBe("documentation-site")
    })

    it("should return last 3 updated repositories", () => {
      const result = controller.getLastNUpdatedRepositories(mockRepositories, 3)

      expect(result).toHaveLength(3)
      expect(result.map((repo) => repo.name)).toEqual(["haskell-project", "api-gateway", "python-tools"])
    })
  })

  describe("getTotalStars", () => {
    it("should calculate total stars across all repositories", () => {
      const result = controller.getTotalStars(mockRepositories)

      expect(result).toBe(96) // Sum of all stars in mock data
    })

    it("should return 0 for empty repository list", () => {
      const result = controller.getTotalStars([])

      expect(result).toBe(0)
    })
  })

  describe("Integration scenarios", () => {
    it("should handle complete workflow with mock data", async () => {
      // Given: Fetch repositories
      const repositories = await controller.getOrganizationRepositories("stackbuilders")

      // When: Apply business logic
      const popularRepos = controller.getRepositoriesWithMoreThanNStars(repositories, 5)
      const recentRepos = controller.getLastNUpdatedRepositories(repositories, 5)
      const totalStars = controller.getTotalStars(repositories)

      // Then: Verify results
      expect(repositories).toHaveLength(6)
      expect(popularRepos).toHaveLength(4)
      expect(recentRepos).toHaveLength(5)
      expect(totalStars).toBe(96)

      // Verify popular repos have more than 5 stars
      expect(popularRepos.every((repo) => repo.stargazers_count > 5)).toBe(true)

      // Verify recent repos are sorted by update date
      expect(recentRepos[0].updated_at > recentRepos[1].updated_at).toBe(true)
    })
  })
})
