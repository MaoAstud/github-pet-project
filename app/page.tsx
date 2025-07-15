"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, GitFork, Calendar, Loader2 } from "lucide-react"
import { GitHubController } from "../controllers/GitHubController"
import type { Repository } from "../interfaces/GitHubTypes"

export default function GitHubDashboard() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const controller = new GitHubController()

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const repos = await controller.getOrganizationRepositories("stackbuilders")
      setRepositories(repos)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const repositoriesWithMoreThan5Stars = controller.getRepositoriesWithMoreThanNStars(repositories, 5)
  const last5UpdatedRepositories = controller.getLastNUpdatedRepositories(repositories, 5)
  const totalStars = controller.getTotalStars(repositories)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading repositories...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchData} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stack Builders GitHub Dashboard</h1>
          <p className="text-gray-600">Analyzing {repositories.length} repositories from Stack Builders organization</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Repositories</CardTitle>
              <GitFork className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{repositories.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stars</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStars}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Repos with 5+ Stars</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{repositoriesWithMoreThan5Stars.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Repositories with more than 5 stars */}
          <Card>
            <CardHeader>
              <CardTitle>Repositories with 5+ Stars</CardTitle>
              <CardDescription>Showing {repositoriesWithMoreThan5Stars.length} repositories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {repositoriesWithMoreThan5Stars.map((repo) => (
                  <div key={repo.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-blue-600 hover:text-blue-800">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          {repo.name}
                        </a>
                      </h3>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </Badge>
                    </div>
                    {repo.description && <p className="text-sm text-gray-600 mb-2">{repo.description}</p>}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Last 5 updated repositories */}
          <Card>
            <CardHeader>
              <CardTitle>Recently Updated</CardTitle>
              <CardDescription>Last 5 updated repositories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {last5UpdatedRepositories.map((repo) => (
                  <div key={repo.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-blue-600 hover:text-blue-800">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          {repo.name}
                        </a>
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stargazers_count}
                        </Badge>
                      </div>
                    </div>
                    {repo.description && <p className="text-sm text-gray-600 mb-2">{repo.description}</p>}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
