import {makeAutoObservable} from "mobx";
import {ITask} from "../types/types";

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

    updateTaskListAfterDeletion() {
        const updatingTaskList = this.deleteTask(this.currentTask.id, this.taskList)
        this.setTaskList(updatingTaskList)
    }

    updateTaskListAfterUpdateName(id: string, name: string) {
        if (name.trim() !== '' && name !== this.currentTask.name) {
            const updatingTaskList = this.updateTaskName(id, this.taskList, name)
            this.setTaskList(updatingTaskList)
        }
    }

    updateTaskListAfterUpdateText(id: string, text: string) {
        if (text.trim() !== '' && text !== this.currentTask.text) {
            const updatingTaskList = this.updateTaskText(id, this.taskList, text)
            this.setTaskList(updatingTaskList)
        }
    }

    updateTaskName(id: string, taskList: ITask[], name: string): ITask[] {
        return taskList.map(task => {
            if (id === task.id) {
                return {...task, name: name}
            }

            return {...task, taskList: this.updateTaskName(id, task.taskList, name)}
        })
    }

    updateTaskText(id: string, taskList: ITask[], text: string): ITask[] {
        return taskList.map(task => {
            if (id === task.id) {
                return {...task, text: text}
            }

            return {...task, taskList: this.updateTaskText(id, task.taskList, text)}
        })
    }

    deleteTask(id: string, taskList: ITask[]): ITask[] {
        return taskList.filter(task => task.id !== id).map(task => {
            return {...task, taskList: this.deleteTask(id, task.taskList)}
        })
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