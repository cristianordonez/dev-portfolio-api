interface IStatus {
    state: string
    environmentUrl: string
    logUrl: string
}

interface INode {
    id: string
    createdAt: string
    environment: string
    state: string
    latestStatus?: IStatus
}

interface IEdge {
    node: INode
}

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
    deployments: {
        edges?: IEdge[]
    }
}
