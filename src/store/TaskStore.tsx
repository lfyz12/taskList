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
                parentId: this.currentTask.id,
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
            const updatingTaskList = this.updateTaskFields(id, this.taskList, {name})
            this.setTaskList(updatingTaskList)
        }
    }

    updateTaskListAfterUpdateText(id: string, text: string) {
        if (text.trim() !== '' && text !== this.currentTask.text) {
            const updatingTaskList = this.updateTaskFields(id, this.taskList, {text})
            this.setTaskList(updatingTaskList)
        }
    }

    updateTaskListAfterMark() {
        const updatingTaskList = this.markTask(this.currentTask.id, this.taskList)
        this.setTaskList(this.updateParentStatus(updatingTaskList))
    }

    updateParentStatus(taskList: ITask[]): ITask[] {
        return taskList.map(task => {
            if (task.taskList.length > 0) {
                const allSubtasksMarked = task.taskList.every(subTask => subTask.status);

                return {
                    ...task,
                    status: allSubtasksMarked,
                    taskList: this.updateParentStatus(task.taskList)
                };
            }
            return task;
        });
    }


    markTask(id: string, taskList: ITask[]): ITask[] {
        return taskList.map(task => {
            if (task.id === id) {
                const newStatus = !task.status
                return {...task, status: newStatus, taskList: this.markAllTask(task.taskList, newStatus)}
            }

            return {...task, taskList: this.markTask(id, task.taskList)}
        })
    }

    markAllTask(taskList: ITask[], newStatus: boolean): ITask[] {
        return taskList.map(task => {
            if (task.taskList.length > 0) {
                return {...task, status: newStatus, taskList: this.markAllTask(task.taskList, newStatus)}
            }
            return {...task, status: newStatus}
        })
    }

    updateTaskFields(id: string, taskList: ITask[], updatedFields: Partial<ITask>): ITask[] {
        return taskList.map(task => {
            if (id === task.id) {
                return { ...task, ...updatedFields };
            }
            return { ...task, taskList: this.updateTaskFields(id, task.taskList, updatedFields) };
        });
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