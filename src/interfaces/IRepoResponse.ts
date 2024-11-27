import MessageResponse from './IMessageResponse'

export default interface IRepoResponse extends MessageResponse {
    stack?: string
}
