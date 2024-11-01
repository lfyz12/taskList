export interface ITask {
    id: string
    name: string
    text: string
    status: boolean
    taskList: ITask[]
}