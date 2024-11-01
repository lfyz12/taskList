import {makeAutoObservable} from "mobx";

export interface ITask {
    id: string
    name: string
    text: string
    status: boolean
    taskList: ITask[]
}

export default class TaskStore {
    currentTask = {} as ITask
    taskList = [] as ITask[]

    constructor() {
        makeAutoObservable(this)
        this.loadTaskListFromLocalStorage()
    }


    loadTaskListFromLocalStorage() {
        const storedTaskList = localStorage.getItem('taskList');
        if (storedTaskList) {
            this.taskList = JSON.parse(storedTaskList) as ITask[];
        }
    }

    saveTaskListToLocalStorage() {
        localStorage.setItem('taskList', JSON.stringify(this.taskList));
    }

    setTaskList(taskList: ITask[]) {
        this.taskList = taskList
        this.saveTaskListToLocalStorage()
    }

    setCurrentTask(task: ITask) {
        this.currentTask = task
    }

    createNewTask(name: string, text: string) {
            const newTask: ITask = {
                id: this.currentTask.id ? `${this.currentTask.id}.${this.currentTask.taskList.length}` : `${this.taskList.length}`,
                name,
                text,
                status: false,
                taskList: [] as ITask[],
            }

            const updateTaskList = this.currentTask.id ?
                this.addNewTask(this.currentTask.id, this.taskList, newTask) :
                [...this.taskList, newTask]

            this.setTaskList(updateTaskList)

    }

    addNewTask(id: string, taskList: ITask[], newTask: ITask): ITask[] {
        return taskList.map(task => {
            if (task.id === id) {
                return {...task, taskList: [...task.taskList, newTask]}
            }
            return {...task, taskList: this.addNewTask(id, task.taskList, newTask)}
        })
    }

}