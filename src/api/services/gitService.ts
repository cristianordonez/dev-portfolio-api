import axios from 'axios'
import IRepoData from '../../interfaces/IRepoData'

class GitService {
    private graphQlUrl: string

    private githubToken: string

    constructor() {
        this.graphQlUrl = 'https://api.github.com/graphql'
        this.githubToken = `${process.env.GITHUB_API_TOKEN}`
    }

    /**
     *
     * @param user name of user
     * @param repoName name of repo
     * @returns reque
     */
    public async getGraphQLData(
        user: string,
        repoName: string
    ): Promise<IRepoData> {
        const gqlQuery = `{
            repositoryOwner (login: "${user}") {
                repositories {
                totalCount
                }
                repository(name: "${repoName}") {
                id
                name
                openGraphImageUrl
                description
                url
                owner {
                    login
                    id
                }
                deployments(first: 1) {
                    edges {
                        node {
                            environment
                        }
                    }
                }
                }
            }
            }`
        const res = await axios.post(
            this.graphQlUrl,
            { query: gqlQuery },
            {
                headers: {
                    Authorization: `bearer ${this.githubToken}`
                }
            }
        )
        return res.data.data.repositoryOwner.repository
    }
}

export default GitService
