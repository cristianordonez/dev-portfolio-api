import MessageResponse from './IMessageResponse'

interface IRepo {
    id: string
    name: string
    image: string
    url: string
    description: null | string
    deploy_url: null | string
}
export default interface IRepoResponse extends MessageResponse {
    data: IRepo[]
}
