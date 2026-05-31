import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {IBlock, BlockType} from "../types/types";
import TaskStore from "../store/TaskStore";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import TableBlock from "./TableBlock";
import DrawBlock from "./DrawBlock";

const BLOCK_LABELS: Record<BlockType, string> = {
  text: 'block.text',
  image: 'block.image',
  table: 'block.table',
  draw: 'block.drawing',
}

const CreateTaskForm = () => {
  const {taskStore} = useContext(Context)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [blocks, setBlocks] = useState<IBlock[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const canSubmit = name.trim().length > 0

  const handleAddBlock = (type: BlockType) => {
    const block: IBlock = {
      id: TaskStore.genBlockId(),
      type,
      text: type === 'text' ? '' : undefined,
      rows: type === 'table' ? [['', '']] : undefined,
      colCount: type === 'table' ? 2 : undefined,
    }
    setBlocks(prev => [...prev, block])
    setMenuOpen(false)
  }

  const handleUpdateBlock = (blockId: string, fields: Partial<IBlock>) => {
    setBlocks(prev => prev.map(b => b.id === blockId ? {...b, ...fields} : b))
  }

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(b => b.id !== blockId))
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    const taskId = taskStore.createNewTask(name.trim(), text.trim(), blocks)
    setName('')
    setText('')
    setBlocks([])
    navigate(`/taskList/taskItem/${taskId}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className='flex flex-col h-full p-4 md:p-8 pt-14 lg:pt-8 overflow-y-auto'>
      <div className='flex-1'>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          className='w-full text-xl md:text-2xl font-semibold text-apple-gray-900 dark:text-apple-gray-100 placeholder-apple-gray-300 dark:placeholder-apple-gray-600 bg-transparent border-none outline-none mb-3'
          placeholder={taskStore.t('task.whatToAccomplish')}
          autoFocus
        />

        <div className='h-px bg-apple-gray-100 dark:bg-apple-gray-700 mb-4 md:mb-5'/>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className='w-full text-sm leading-relaxed text-apple-gray-600 dark:text-apple-gray-400 placeholder-apple-gray-300 dark:placeholder-apple-gray-600 bg-transparent border-none outline-none resize-none'
          placeholder={name.trim() ? taskStore.t('task.addNotes') : taskStore.t('task.startWithName')}
          rows={3}
          readOnly={!name.trim()}
        />

        {/* Blocks */}
        <div className='h-px bg-apple-gray-100 dark:bg-apple-gray-700 my-4 md:my-5'/>
        <span className='text-[11px] font-semibold text-apple-gray-400 dark:text-apple-gray-500 uppercase tracking-wider mb-3 block'>{taskStore.t('task.blocks')}</span>

        <div className='flex flex-col gap-3 md:gap-2'>
          {blocks.map(block => (
            <div key={block.id} className='group relative'>
              <div className='rounded-apple border border-apple-gray-100/60 dark:border-apple-gray-700/60 hover:border-apple-gray-200 dark:hover:border-apple-gray-600 transition-colors bg-white dark:bg-apple-gray-800/60'>
                <div className='absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <button
                    onClick={() => handleDeleteBlock(block.id)}
                    className='w-7 h-7 md:w-6 md:h-6 flex items-center justify-center rounded-full bg-white dark:bg-apple-gray-700 border border-apple-gray-200 dark:border-apple-gray-600 shadow-apple-sm text-apple-gray-400 hover:text-apple-red hover:border-apple-red/30 transition-all'
                    title={taskStore.t('block.deleteBlock')}
                  >
                    <svg className='w-4 h-4 md:w-3.5 md:h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </button>
                </div>
                <div className='px-3 py-3 md:px-4 md:py-3'>
                  {block.type === 'text' && <TextBlock block={block} onUpdate={handleUpdateBlock}/>}
                  {block.type === 'image' && <ImageBlock block={block} onUpdate={handleUpdateBlock}/>}
                  {block.type === 'table' && <TableBlock block={block} onUpdate={handleUpdateBlock}/>}
                  {block.type === 'draw' && <DrawBlock block={block} onUpdate={handleUpdateBlock}/>}
                </div>
              </div>
            </div>
          ))}

          {/* Add block toolbar */}
          <div className='relative'>
            {menuOpen && (
              <div className='absolute bottom-full left-0 mb-2 bg-white dark:bg-apple-gray-800 rounded-apple-lg shadow-apple-lg border border-apple-gray-100 dark:border-apple-gray-700 p-1.5 z-10 min-w-[180px]'>
                {(Object.keys(BLOCK_LABELS) as BlockType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => handleAddBlock(type)}
                    className='w-full flex items-center gap-2.5 px-3 py-2.5 md:py-2 rounded-apple text-sm font-medium text-apple-gray-600 dark:text-apple-gray-300 hover:bg-apple-gray-50 dark:hover:bg-apple-gray-700 hover:text-apple-gray-900 dark:hover:text-apple-gray-100 transition-all'
                  >
                    <span className='text-apple-gray-400 dark:text-apple-gray-500'>
                      {type === 'text' && <svg className='w-4 h-4 md:w-3.5 md:h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h7'/></svg>}
                      {type === 'image' && <svg className='w-4 h-4 md:w-3.5 md:h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'/></svg>}
                      {type === 'table' && <svg className='w-4 h-4 md:w-3.5 md:h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'/></svg>}
                      {type === 'draw' && <svg className='w-4 h-4 md:w-3.5 md:h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'/></svg>}
                    </span>
                    {taskStore.t(BLOCK_LABELS[type] as any)}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='flex items-center gap-1.5 px-3 py-3 md:py-2 rounded-apple text-xs font-medium text-apple-gray-400 dark:text-apple-gray-500 hover:text-apple-blue hover:bg-apple-blue/5 dark:hover:bg-apple-blue/10 transition-all w-full'
            >
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
              </svg>
              {taskStore.t('task.addBlock')}
            </button>
          </div>

          {menuOpen && <div className='fixed inset-0 z-0' onClick={() => setMenuOpen(false)}/>}
        </div>
      </div>

      <div className='shrink-0 flex items-center gap-3 pt-4 mt-6 border-t border-apple-gray-100 dark:border-apple-gray-700'>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`
            px-5 py-2.5 md:py-2 text-sm font-medium rounded-apple transition-all
            ${canSubmit
              ? 'bg-apple-blue text-white shadow-apple-sm hover:bg-apple-blue/90 active:scale-[0.98]'
              : 'bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-300 dark:text-apple-gray-600 cursor-not-allowed'
            }
          `}
        >
          {taskStore.t('task.addTask')}
        </button>
        <button
          onClick={() => navigate('/taskList')}
          className='px-5 py-2.5 md:py-2 text-sm font-medium text-apple-gray-400 dark:text-apple-gray-500 hover:text-apple-gray-600 dark:hover:text-apple-gray-300 transition-colors'
        >
          {taskStore.t('task.cancel')}
        </button>
      </div>
    </div>
  );
};

export default CreateTaskForm;
