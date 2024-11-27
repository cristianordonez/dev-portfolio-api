export default interface IRepoData {
    id: string
    name: string
    openGraphImageUrl: string
    description: string
    url: string
    owner: {
        login: string
        id: string
    }
}
