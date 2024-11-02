export interface ITask {
    id: string
    parentId: string
    name: string
    text: string
    status: boolean
    taskList: ITask[]
}