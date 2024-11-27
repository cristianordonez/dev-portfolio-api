import IRepoData from '../../interfaces/IRepoData'
import { query } from '../db'

class RepoModel {
    /**
     * todo Delete repository
     */
    public async delete() {
        console.log('here')
    }

    /**
     * todo retrieves all repos from database
     */
    public async get() {
        console.log('here')
    }

    /**
     * Creates/Updates user and repo in database
     * @param body contents sent from Github webook
     */
    public async createOrUpdate(repoData: IRepoData): Promise<void> {
        // const repoData = await this.getGraphQLData(
        //     body.repository.owner.login,
        //     body.repository.name
        // )
        await this.insertUser(repoData.owner.id, repoData.owner.login)
        await this.insertRepo(repoData)
        await this.insertUsersRepos(repoData.owner.id, repoData.id)
    }

    /**
     * Update the users_repos table
     * @param userId unique id of git user
     * @param repoId unique id of repository
     */
    private async insertUsersRepos(userId: string, repoId: string) {
        const sqlQuery =
            'INSERT INTO USERS_REPOS (user_id, repo_id) VALUES ($1, $2) on conflict (user_id, repo_id) do nothing'
        const values = [userId, repoId]
        await query(sqlQuery, values)
    }

    /**
     * Add new user to able
     * @param id unique id of user
     * @param name name of user
     */
    private async insertUser(id: string, name: string): Promise<void> {
        const sqlQuery =
            'INSERT INTO USERS (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING'
        await query(sqlQuery, [id, name])
    }

    /**
     * Add or update repo in table
     * @param repoData object containing info for repo, IRepoData interface
     */
    private async insertRepo(repoData: IRepoData): Promise<void> {
        const { id, name, openGraphImageUrl, description, url } = repoData
        const sqlQuery = `
        INSERT INTO repos (id, name, image, description, url)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) 
        DO UPDATE SET
            name = EXCLUDED.name,
            image = EXCLUDED.image,
            description = EXCLUDED.description,
            url = EXCLUDED.url;
    `
        const values = [id, name, openGraphImageUrl, description, url]
        await query(sqlQuery, values)
    }
}

export default RepoModel
