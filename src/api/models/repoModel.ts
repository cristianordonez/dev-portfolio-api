import IRepoData from '../../interfaces/IRepoData'
import { query } from '../db'

class RepoModel {
    /**
     * Get all repos for user
     * @param userId unique id of user
     * @returns array of repos
     */
    public async get(userId: string) {
        const sqlQuery = `
            SELECT repos.id, repos.name, repos.image, repos.url, repos.description, repos.deploy_url 
            FROM users 
            INNER JOIN REPOS ON users.id = repos.user_id
            WHERE users.id = $1
        `
        const values = [userId]
        const result = await query(sqlQuery, values)
        return result.rows
    }

    /**
     * Deletes from repos table
     * @param repoId unique id of repo
     */
    public async delete(repoId: string) {
        const sqlQuery = 'DELETE FROM repos where id = $1'
        const values = [repoId]
        await query(sqlQuery, values)
    }

    /**
     * Creates/Updates user and repo in database
     * @param body contents sent from Github webook
     */
    public async createOrUpdate(repoData: IRepoData): Promise<void> {
        await this.insertUser(repoData.owner.id, repoData.owner.login)
        await this.insertRepo(repoData)
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
        const { id, name, openGraphImageUrl, description, url, owner } =
            repoData
        let deployUrl = ''
        if (
            repoData.deployments.edges &&
            repoData.deployments.edges.length &&
            repoData.deployments.edges[0].node &&
            repoData.deployments.edges[0].node.latestStatus
        ) {
            deployUrl =
                repoData.deployments.edges[0].node.latestStatus.environmentUrl
        }
        const sqlQuery = `
        INSERT INTO repos (id, name, image, description, url, deploy_url, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) 
        DO UPDATE SET
            name = EXCLUDED.name,
            image = EXCLUDED.image,
            description = EXCLUDED.description,
            url = EXCLUDED.url,
            deploy_url = EXCLUDED.deploy_url;
    `
        const values = [
            id,
            name,
            openGraphImageUrl,
            description,
            url,
            deployUrl,
            owner.id
        ]
        await query(sqlQuery, values)
    }
}

export default RepoModel
