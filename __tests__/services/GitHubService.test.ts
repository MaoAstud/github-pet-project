import { describe, it, expect, beforeEach } from "vitest"
import {
  filterRepositoriesByStars,
  sortRepositoriesByUpdatedDate,
  getLastNRepositories,
  calculateTotalStars,
} from "../../services/GitHubService"
import { mockRepositories } from "../fixtures/mockRepositories"
import type { Repository } from "../../interfaces/GitHubTypes"

describe("GitHubService Pure Functions", () => {
  let repositories: Repository[]

  beforeEach(() => {
    repositories = [...mockRepositories]
  })

  describe("filterRepositoriesByStars", () => {
    it("should filter repositories with more than 5 stars", () => {
      const result = filterRepositoriesByStars(repositories, 5)

      expect(result.every((repo) => repo.stargazers_count > 5)).toBe(true)
    })

    it("should return empty array when no repositories meet criteria", () => {
      const result = filterRepositoriesByStars(repositories, 100)

      expect(result).toHaveLength(0)
    })

    it("should return all repositories when minStars is 0", () => {
      const result = filterRepositoriesByStars(repositories, 0)

      expect(result).toHaveLength(repositories.length)
    })
  })

  describe("sortRepositoriesByUpdatedDate", () => {
    it("should sort repositories by updated date in descending order", () => {
      const result = sortRepositoriesByUpdatedDate(repositories)

      expect(result[0].name).toBe("haskell-project") // 2024-01-15
      expect(result[1].name).toBe("api-gateway") // 2024-01-14
      expect(result[2].name).toBe("python-tools") // 2024-01-12
      expect(result[3].name).toBe("react-components") // 2024-01-10
      expect(result[4].name).toBe("documentation-site") // 2024-01-08
      expect(result[5].name).toBe("small-utility") // 2024-01-05
    })

    it("should not mutate the original array", () => {
      const originalOrder = repositories.map((repo) => repo.name)
      sortRepositoriesByUpdatedDate(repositories)

      expect(repositories.map((repo) => repo.name)).toEqual(originalOrder)
    })
  })

  describe("getLastNRepositories", () => {
    it("should return the first N repositories from the array", () => {
      const result = getLastNRepositories(repositories, 3)

      expect(result).toHaveLength(3)
      expect(result.map((repo) => repo.name)).toEqual(["haskell-project", "react-components", "small-utility"])
    })

    it("should return all repositories when N is greater than array length", () => {
      const result = getLastNRepositories(repositories, 10)

      expect(result).toHaveLength(repositories.length)
    })

    it("should return empty array when N is 0", () => {
      const result = getLastNRepositories(repositories, 0)

      expect(result).toHaveLength(0)
    })
  })

  describe("calculateTotalStars", () => {
    it("should calculate the sum of all repository stars", () => {
      const result = calculateTotalStars(repositories)

      // 25 + 12 + 3 + 18 + 7 + 31 = 96
      expect(result).toBe(96)
    })

    it("should return 0 for empty array", () => {
      const result = calculateTotalStars([])

      expect(result).toBe(0)
    })

    it("should handle repositories with 0 stars", () => {
      const reposWithZeroStars = repositories.map((repo) => ({
        ...repo,
        stargazers_count: 0,
      }))

      const result = calculateTotalStars(reposWithZeroStars)

      expect(result).toBe(0)
    })
  })
})
