export type BlockType = 'text' | 'image' | 'table' | 'draw'

export interface IBlock {
  id: string
  type: BlockType
  text?: string
  dataUrl?: string
  fileName?: string
  rows?: string[][]
  colCount?: number
  drawing?: string
}

export interface ITask {
  id: string
  name: string
  text: string
  status: boolean
  taskList: ITask[]
  blocks: IBlock[]
}
