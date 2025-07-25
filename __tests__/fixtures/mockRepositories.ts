import type { Repository } from "../../interfaces/GitHubTypes"

export const mockRepositories: Repository[] = [
  {
    id: 1,
    name: "haskell-project",
    full_name: "stackbuilders/haskell-project",
    description: "A comprehensive Haskell project with advanced features",
    html_url: "https://github.com/stackbuilders/haskell-project",
    stargazers_count: 25,
    forks_count: 8,
    language: "Haskell",
    updated_at: "2024-01-15T10:30:00Z",
    created_at: "2023-06-01T09:00:00Z",
    pushed_at: "2024-01-15T10:30:00Z",
    size: 1024,
    open_issues_count: 3,
    topics: ["haskell", "functional-programming"],
    visibility: "public",
    default_branch: "main",
  },
  {
    id: 2,
    name: "react-components",
    full_name: "stackbuilders/react-components",
    description: "Reusable React components library",
    html_url: "https://github.com/stackbuilders/react-components",
    stargazers_count: 12,
    forks_count: 4,
    language: "TypeScript",
    updated_at: "2024-01-10T14:20:00Z",
    created_at: "2023-08-15T11:00:00Z",
    pushed_at: "2024-01-10T14:20:00Z",
    size: 512,
    open_issues_count: 1,
    topics: ["react", "typescript", "components"],
    visibility: "public",
    default_branch: "main",
  },
  {
    id: 3,
    name: "small-utility",
    full_name: "stackbuilders/small-utility",
    description: "A small utility library",
    html_url: "https://github.com/stackbuilders/small-utility",
    stargazers_count: 3,
    forks_count: 1,
    language: "JavaScript",
    updated_at: "2024-01-05T16:45:00Z",
    created_at: "2023-12-01T10:00:00Z",
    pushed_at: "2024-01-05T16:45:00Z",
    size: 128,
    open_issues_count: 0,
    topics: ["utility", "javascript"],
    visibility: "public",
    default_branch: "main",
  },
  {
    id: 4,
    name: "python-tools",
    full_name: "stackbuilders/python-tools",
    description: "Collection of Python development tools",
    html_url: "https://github.com/stackbuilders/python-tools",
    stargazers_count: 18,
    forks_count: 6,
    language: "Python",
    updated_at: "2024-01-12T09:15:00Z",
    created_at: "2023-05-20T14:30:00Z",
    pushed_at: "2024-01-12T09:15:00Z",
    size: 768,
    open_issues_count: 2,
    topics: ["python", "tools", "development"],
    visibility: "public",
    default_branch: "main",
  },
  {
    id: 5,
    name: "documentation-site",
    full_name: "stackbuilders/documentation-site",
    description: "Company documentation and guides",
    html_url: "https://github.com/stackbuilders/documentation-site",
    stargazers_count: 7,
    forks_count: 2,
    language: "Markdown",
    updated_at: "2024-01-08T13:00:00Z",
    created_at: "2023-07-10T08:45:00Z",
    pushed_at: "2024-01-08T13:00:00Z",
    size: 256,
    open_issues_count: 1,
    topics: ["documentation", "guides"],
    visibility: "public",
    default_branch: "main",
  },
  {
    id: 6,
    name: "api-gateway",
    full_name: "stackbuilders/api-gateway",
    description: "Microservices API gateway implementation",
    html_url: "https://github.com/stackbuilders/api-gateway",
    stargazers_count: 31,
    forks_count: 12,
    language: "Go",
    updated_at: "2024-01-14T11:30:00Z",
    created_at: "2023-04-15T16:20:00Z",
    pushed_at: "2024-01-14T11:30:00Z",
    size: 2048,
    open_issues_count: 5,
    topics: ["api", "gateway", "microservices", "go"],
    visibility: "public",
    default_branch: "main",
  },
]
