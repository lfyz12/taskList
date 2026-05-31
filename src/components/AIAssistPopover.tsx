import React, { useState } from 'react';
import { DictKey } from '../i18n/dict';

export interface AIAssistAction {
  id: string
  label: string
  run: () => Promise<string>
  onApply: (result: string) => void
  onInsert?: (result: string) => void
}

interface AIAssistPopoverProps {
  actions: AIAssistAction[]
  t: (key: DictKey) => string
}

type PopoverStatus = 'idle' | 'loading' | 'result' | 'error'

const AIAssistPopover: React.FC<AIAssistPopoverProps> = ({ actions, t }) => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<PopoverStatus>('idle')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [activeAction, setActiveAction] = useState<AIAssistAction | null>(null)

  const runAction = async (action: AIAssistAction) => {
    setActiveAction(action)
    setStatus('loading')
    setError('')
    try {
      const res = await action.run()
      setResult(res)
      setStatus('result')
    } catch (err: any) {
      setError(err.message || t('ai.error'))
      setStatus('error')
    }
  }

  const handleApply = () => {
    if (activeAction) {
      activeAction.onApply(result)
    }
    closePopover()
  }

  const handleInsert = () => {
    if (activeAction?.onInsert) {
      activeAction.onInsert(result)
    }
    closePopover()
  }

  const closePopover = () => {
    setOpen(false)
    setStatus('idle')
    setResult('')
    setError('')
    setActiveAction(null)
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen(prev => !prev)}
        className='flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-apple-gray-700 border border-apple-gray-200 dark:border-apple-gray-600 shadow-apple-sm dark:shadow-none text-apple-gray-400 hover:text-apple-blue hover:border-apple-blue/30 transition-all cursor-pointer'
        title='AI assist'
      >
        <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z' />
        </svg>
      </button>

      {open && (
        <div className='absolute right-0 top-full mt-1 z-30 min-w-[200px] bg-white dark:bg-apple-gray-800 rounded-apple-lg shadow-apple-lg border border-apple-gray-100 dark:border-apple-gray-700 p-2'>
          {status === 'idle' && (
            <div className='flex flex-col gap-0.5'>
              {actions.map(action => (
                <button
                  key={action.id}
                  onClick={() => runAction(action)}
                  className='w-full text-left px-2.5 py-1.5 rounded-apple text-xs font-medium text-apple-gray-600 dark:text-apple-gray-300 hover:bg-apple-gray-50 dark:hover:bg-apple-gray-700 hover:text-apple-gray-900 dark:hover:text-apple-gray-100 transition-all cursor-pointer'
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {status === 'loading' && (
            <div className='flex items-center gap-2 px-2.5 py-2 text-xs text-apple-gray-500 dark:text-apple-gray-400'>
              <svg className='w-3.5 h-3.5 animate-spin' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
              </svg>
              {t('ai.processing')}
            </div>
          )}

          {(status === 'result' || status === 'error') && (
            <div className='space-y-2'>
              {status === 'error' && (
                <p className='px-2.5 text-xs text-apple-red'>{error}</p>
              )}
              {status === 'result' && (
                <textarea
                  readOnly
                  value={result}
                  className='w-full text-xs leading-relaxed text-apple-gray-700 dark:text-apple-gray-300 bg-apple-gray-50 dark:bg-apple-gray-900/50 rounded-apple border border-apple-gray-100 dark:border-apple-gray-700 p-2 outline-none resize-none'
                  rows={Math.min(Math.max(result.split('\n').length, 2), 6)}
                />
              )}
              <div className='flex gap-1.5 px-0.5'>
                {activeAction && (
                  <button
                    onClick={handleApply}
                    className='flex-1 px-2 py-1 rounded-apple text-[10px] font-medium bg-apple-blue text-white hover:bg-apple-blue/90 transition-all cursor-pointer'
                  >
                    {t('ai.apply')}
                  </button>
                )}
                {activeAction?.onInsert && (
                  <button
                    onClick={handleInsert}
                    className='flex-1 px-2 py-1 rounded-apple text-[10px] font-medium bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-300 hover:bg-apple-gray-200 dark:hover:bg-apple-gray-600 transition-all cursor-pointer'
                  >
                    Insert
                  </button>
                )}
                <button
                  onClick={closePopover}
                  className='px-2 py-1 rounded-apple text-[10px] font-medium text-apple-gray-400 hover:text-apple-gray-600 dark:hover:text-apple-gray-300 transition-all cursor-pointer'
                >
                  {t('ai.cancel')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AIAssistPopover
