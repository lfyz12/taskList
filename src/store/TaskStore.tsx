import {makeAutoObservable} from "mobx";
import {ITask, IBlock} from "../types/types";
import dict, {Lang, DictKey} from "../i18n/dict";

let blockIdCounter = 0
const genBlockId = () => `blk_${++blockIdCounter}_${Date.now().toString(36)}`

export default class TaskStore {
  focusedTaskId: string | null = null
  taskList: ITask[] = []
  theme: 'light' | 'dark' = 'light'
  language: Lang = 'en'
  searchQuery: string = ''

  private saveTimer: ReturnType<typeof setTimeout> | null = null
  private readonly SAVE_DELAY = 500

  constructor() {
    makeAutoObservable(this)
    this.loadFromLocalStorage()
    this.applyTheme()
  }

  t(key: DictKey): string {
    return dict[this.language]?.[key] ?? dict.en[key] ?? key
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme
    this.applyTheme()
    localStorage.setItem('tasklist_theme', theme)
  }

  setSearchQuery(query: string) {
    this.searchQuery = query
  }

  toggleTheme() {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light')
  }

  setLanguage(lang: Lang) {
    this.language = lang
    localStorage.setItem('tasklist_lang', lang)
  }

  private applyTheme() {
    document.documentElement.classList.toggle('dark', this.theme === 'dark')
  }

  get focusedTask(): ITask | null {
    if (!this.focusedTaskId) return null
    return this.findTaskById(this.focusedTaskId, this.taskList)
  }

  get breadcrumbs(): ITask[] {
    if (!this.focusedTaskId) return []
    return this.findPathToTask(this.focusedTaskId, this.taskList, [])
  }

  get activeChildren(): ITask[] {
    if (!this.focusedTask) return this.taskList
    return this.focusedTask.taskList
  }

  get filteredTasks(): ITask[] {
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim()
      return this.filterBySearch(this.taskList, q)
    }
    return this.taskList
  }

  private filterBySearch(list: ITask[], q: string): ITask[] {
    return list
      .filter(task => {
        const match = task.name.toLowerCase().includes(q)
        const filteredChildren = this.filterBySearch(task.taskList, q)
        return match || filteredChildren.length > 0
      })
      .map(task => ({
        ...task,
        taskList: this.filterBySearch(task.taskList, q),
      }))
  }

  reorderTask(taskId: string, overId: string) {
    if (taskId === overId) return

    const moveParentId = this.getParentId(taskId)
    const overParentId = this.getParentId(overId)
    if (moveParentId !== overParentId) return

    const moveParent = moveParentId ? this.findTaskById(moveParentId) : null
    const siblings = moveParent ? [...moveParent.taskList] : [...this.taskList]

    const oldIndex = siblings.findIndex(t => t.id === taskId)
    const newIndex = siblings.findIndex(t => t.id === overId)
    if (oldIndex === -1 || newIndex === -1) return

    const [removed] = siblings.splice(oldIndex, 1)
    siblings.splice(newIndex, 0, removed)

    const renumbered = this.renumberTasks(siblings, moveParentId)

    if (moveParentId) {
      this.taskList = this.updateFields(moveParentId, this.taskList, {taskList: renumbered})
    } else {
      this.taskList = renumbered
    }
    this.scheduleSave()
  }

  private getParentId(taskId: string): string | null {
    const lastDot = taskId.lastIndexOf('.')
    return lastDot === -1 ? null : taskId.slice(0, lastDot)
  }


  private loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem('taskList')
      if (raw) this.taskList = JSON.parse(raw) as ITask[]
    } catch { /* ignore corrupt data */ }
    const savedTheme = localStorage.getItem('tasklist_theme')
    if (savedTheme === 'light' || savedTheme === 'dark') this.theme = savedTheme
    const savedLang = localStorage.getItem('tasklist_lang')
    if (savedLang === 'en' || savedLang === 'ru' || savedLang === 'es' || savedLang === 'zh') this.language = savedLang

  }

  private scheduleSave() {
    if (this.saveTimer) clearTimeout(this.saveTimer)
    this.saveTimer = setTimeout(() => {
      localStorage.setItem('taskList', JSON.stringify(this.taskList))
      this.saveTimer = null
    }, this.SAVE_DELAY)
  }

  setTaskList(list: ITask[]) {
    this.taskList = list
    this.scheduleSave()
  }


  setFocusedTaskId(id: string | null) {
    this.focusedTaskId = id
  }

  focusParent() {
    if (!this.focusedTaskId) return
    const crumbs = this.breadcrumbs
    if (crumbs.length <= 1) {
      this.setFocusedTaskId(null)
    } else {
      this.setFocusedTaskId(crumbs[crumbs.length - 2].id)
    }
  }


  findTaskById(id: string, list: ITask[] = this.taskList): ITask | null {
    for (const task of list) {
      if (task.id === id) return task
      const found = this.findTaskById(id, task.taskList)
      if (found) return found
    }
    return null
  }

  private findPathToTask(id: string, list: ITask[], path: ITask[]): ITask[] {
    for (const task of list) {
      if (task.id === id) return [...path, task]
      const found = this.findPathToTask(id, task.taskList, [...path, task])
      if (found.length) return found
    }
    return []
  }


  createNewTask(name: string, text: string, blocks: IBlock[] = [], forceRoot = false): string {
    const parentId = forceRoot ? null : this.focusedTaskId
    const parent = parentId ? this.findTaskById(parentId) : null
    const siblings = parentId && parent ? parent.taskList : this.taskList

    const newTask: ITask = {
      id: parentId
        ? `${parentId}.${siblings.length + 1}`
        : `${this.taskList.length + 1}`,
      name,
      text,
      status: false,
      taskList: [],
      blocks,
    }

    this.setTaskList(
      parentId
        ? this.addChild(parentId, this.taskList, newTask)
        : [...this.taskList, newTask]
    )

    if (!forceRoot) {
      this.setFocusedTaskId(newTask.id)
    }
    return newTask.id
  }

  private addChild(id: string, list: ITask[], child: ITask): ITask[] {
    return list.map(task => {
      if (task.id === id) {
        return {...task, taskList: [...task.taskList, child]}
      }
      return {...task, taskList: this.addChild(id, task.taskList, child)}
    })
  }

  deleteTask(id: string) {
    const clean = this.removeFromTree(id, this.taskList)
    this.setTaskList(this.renumberTasks(clean))
    if (this.focusedTaskId === id) this.setFocusedTaskId(null)
  }

  private removeFromTree(id: string, list: ITask[]): ITask[] {
    return list
      .filter(task => task.id !== id)
      .map(task => ({...task, taskList: this.removeFromTree(id, task.taskList)}))
  }

  toggleTask(id: string) {
    const next = this.toggleInTree(id, this.taskList)
    this.setTaskList(this.cascadeParentStatus(next))
  }

  private toggleInTree(id: string, list: ITask[]): ITask[] {
    return list.map(task => {
      if (task.id === id) {
        const newStatus = !task.status
        return {...task, status: newStatus, taskList: this.setAllChildrenStatus(task.taskList, newStatus)}
      }
      return {...task, taskList: this.toggleInTree(id, task.taskList)}
    })
  }

  private setAllChildrenStatus(list: ITask[], status: boolean): ITask[] {
    return list.map(task => ({
      ...task,
      status,
      taskList: this.setAllChildrenStatus(task.taskList, status),
    }))
  }

  private cascadeParentStatus(list: ITask[]): ITask[] {
    return list.map(task => {
      const updated = {...task, taskList: this.cascadeParentStatus(task.taskList)}
      if (updated.taskList.length > 0) {
        updated.status = updated.taskList.every(st => st.status)
      }
      return updated
    })
  }

  updateTask(id: string, fields: Partial<ITask>) {
    this.taskList = this.updateFields(id, this.taskList, fields)
    this.scheduleSave()
  }

  private updateFields(id: string, list: ITask[], fields: Partial<ITask>): ITask[] {
    return list.map(task => {
      if (task.id === id) return {...task, ...fields}
      return {...task, taskList: this.updateFields(id, task.taskList, fields)}
    })
  }

  private renumberTasks(list: ITask[], parentId: string | null = null): ITask[] {
    return list.map((task, i) => {
      const newId = parentId ? `${parentId}.${i + 1}` : `${i + 1}`
      return {
        ...task,
        id: newId,
        taskList: this.renumberTasks(task.taskList, newId),
      }
    })
  }


  addBlock(taskId: string, block: IBlock) {
    const task = this.findTaskById(taskId)
    if (!task) return
    const blocks = [...(task.blocks || []), block]
    this.updateTask(taskId, {blocks})
  }

  updateBlock(taskId: string, blockId: string, fields: Partial<IBlock>) {
    const task = this.findTaskById(taskId)
    if (!task) return
    const blocks = (task.blocks || []).map(b =>
      b.id === blockId ? {...b, ...fields} : b
    )
    this.updateTask(taskId, {blocks})
  }

  deleteBlock(taskId: string, blockId: string) {
    const task = this.findTaskById(taskId)
    if (!task) return
    const blocks = (task.blocks || []).filter(b => b.id !== blockId)
    this.updateTask(taskId, {blocks})
  }

  reorderBlock(taskId: string, blockId: string, overBlockId: string) {
    if (blockId === overBlockId) return
    const task = this.findTaskById(taskId)
    if (!task) return
    const blocks = [...(task.blocks || [])]
    const oldIndex = blocks.findIndex(b => b.id === blockId)
    const newIndex = blocks.findIndex(b => b.id === overBlockId)
    if (oldIndex === -1 || newIndex === -1) return
    const [removed] = blocks.splice(oldIndex, 1)
    blocks.splice(newIndex, 0, removed)
    this.updateTask(taskId, {blocks})
  }

  static genBlockId(): string {
    return genBlockId()
  }
}
