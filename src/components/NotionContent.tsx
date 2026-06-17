import React, {useContext, useState, useRef, useEffect, useCallback} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {IBlock, BlockType} from "../types/types";
import {
  DndContext, DragEndEvent, DragStartEvent, DragOverlay,
  useSensor, useSensors, PointerSensor,
} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import TableBlock from "./TableBlock";
import DrawBlock from "./DrawBlock";
import TaskStore from "../store/TaskStore";

interface NotionContentProps {
  taskId: string
  blocks: IBlock[]
}

const BLOCK_LABELS: Record<BlockType, string> = {
  text: 'block.text',
  image: 'block.image',
  table: 'block.table',
  draw: 'block.drawing',
}

const BLOCK_ICONS: Record<BlockType, React.ReactNode> = {
  text: <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h7'/></svg>,
  image: <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'/></svg>,
  table: <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'/></svg>,
  draw: <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'/></svg>,
}

interface SortableBlockProps {
  block: IBlock
  onUpdate: (blockId: string, fields: Partial<IBlock>) => void
  onDelete: (blockId: string) => void
}

const SortableBlock: React.FC<SortableBlockProps> = ({block, onUpdate, onDelete}) => {
  const {taskStore} = useContext(Context)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: block.id})

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className='group relative'>
      <div className={`rounded-apple border border-apple-gray-100/60 dark:border-apple-gray-700/60 hover:border-apple-gray-200 dark:hover:border-apple-gray-600 transition-colors bg-white dark:bg-apple-gray-800/60 ${isDragging ? 'shadow-apple-lg ring-1 ring-apple-blue/20 opacity-90' : ''}`}>
        <div className='absolute -top-2 -right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
          <div className='-left-8 top-1/2 -translate-y-1/2 absolute flex items-center opacity-0 group-hover:opacity-100 transition-opacity'>
            <button
              {...attributes}
              {...listeners}
              className='flex items-center justify-center w-5 h-8 rounded text-apple-gray-300 dark:text-apple-gray-600 hover:text-apple-gray-500 dark:hover:text-apple-gray-400 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-700 transition-all cursor-grab active:cursor-grabbing'
              title='Drag to reorder'
            >
              <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'>
                <circle cx='9' cy='5' r='1.5'/>
                <circle cx='15' cy='5' r='1.5'/>
                <circle cx='9' cy='12' r='1.5'/>
                <circle cx='15' cy='12' r='1.5'/>
                <circle cx='9' cy='19' r='1.5'/>
                <circle cx='15' cy='19' r='1.5'/>
              </svg>
            </button>
          </div>
          <button
            onClick={() => onDelete(block.id)}
            className='w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-apple-gray-700 border border-apple-gray-200 dark:border-apple-gray-600 shadow-apple-sm dark:shadow-none text-apple-gray-400 dark:text-apple-gray-400 hover:text-apple-red hover:border-apple-red/30 transition-all cursor-pointer'
            title={taskStore.t('block.deleteBlock')}
          >
            <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <div className='px-4 py-3'>
          {block.type === 'text' && (
            <TextBlock block={block} onUpdate={onUpdate}/>
          )}
          {block.type === 'image' && (
            <ImageBlock block={block} onUpdate={onUpdate}/>
          )}
          {block.type === 'table' && (
            <TableBlock block={block} onUpdate={onUpdate}/>
          )}
          {block.type === 'draw' && (
            <DrawBlock block={block} onUpdate={onUpdate}/>
          )}
        </div>
      </div>
    </div>
  )
}

const NotionContent: React.FC<NotionContentProps> = ({taskId, blocks}) => {
  const {taskStore} = useContext(Context)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  const handleAddBlock = (type: BlockType) => {
    const block: IBlock = {
      id: TaskStore.genBlockId(),
      type,
      text: type === 'text' ? '' : undefined,
      rows: type === 'table' ? [['', '']] : undefined,
      colCount: type === 'table' ? 2 : undefined,
    }
    taskStore.addBlock(taskId, block)
    setMenuOpen(false)
  }

  const handleUpdateBlock = (blockId: string, fields: Partial<IBlock>) => {
    taskStore.updateBlock(taskId, blockId, fields)
  }

  const handleDeleteBlock = (blockId: string) => {
    taskStore.deleteBlock(taskId, blockId)
  }

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(event.active.id as string)
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveDragId(null)
    const {active, over} = event
    if (!over || active.id === over.id) return
    taskStore.reorderBlock(taskId, active.id as string, over.id as string)
  }, [taskStore, taskId])

  const handleDragCancel = useCallback(() => {
    setActiveDragId(null)
  }, [])

  const draggedBlock = activeDragId ? blocks.find(b => b.id === activeDragId) : null

  return (
    <div className='flex flex-col gap-2'>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.map(block => (
            <SortableBlock
              key={block.id}
              block={block}
              onUpdate={handleUpdateBlock}
              onDelete={handleDeleteBlock}
            />
          ))}
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          {draggedBlock && (
            <div className='rounded-apple bg-white dark:bg-apple-gray-700 shadow-apple-lg border border-apple-gray-100 dark:border-apple-gray-600 px-4 py-3 max-w-[300px]'>
              <p className='text-sm font-medium text-apple-gray-500 dark:text-apple-gray-400'>
                {draggedBlock.type === 'text' ? 'Text block' :
                 draggedBlock.type === 'image' ? 'Image block' :
                 draggedBlock.type === 'table' ? 'Table block' : 'Drawing block'}
              </p>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <div className='relative pt-1' ref={menuRef}>
        {menuOpen && (
          <div className='absolute bottom-full left-0 mb-2 bg-white dark:bg-apple-gray-800 rounded-apple-lg shadow-apple-lg border border-apple-gray-100 dark:border-apple-gray-700 p-1.5 z-10 min-w-[180px]'>
            {(Object.keys(BLOCK_LABELS) as BlockType[]).map(type => (
              <button
                key={type}
                onClick={() => handleAddBlock(type)}
                className='w-full flex items-center gap-2.5 px-3 py-2 rounded-apple text-sm font-medium text-apple-gray-600 dark:text-apple-gray-300 hover:bg-apple-gray-50 dark:hover:bg-apple-gray-700 hover:text-apple-gray-900 dark:hover:text-apple-gray-100 transition-all'
              >
                <span className='text-apple-gray-400 dark:text-apple-gray-500'>{BLOCK_ICONS[type]}</span>
                {taskStore.t(BLOCK_LABELS[type] as any)}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='flex items-center gap-1.5 px-3 py-2 rounded-apple text-xs font-medium text-apple-gray-400 dark:text-apple-gray-500 hover:text-apple-blue hover:bg-apple-blue/5 dark:hover:bg-apple-blue/10 transition-all w-full'
        >
          <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
          </svg>
          {taskStore.t('block.addBlock')}
        </button>
      </div>
    </div>
  );
};

export default observer(NotionContent);
