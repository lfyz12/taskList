import React, { useState, useCallback } from 'react';
import { improveText, splitIntoSubtasks } from '../shared/api/ai';
import { DictKey } from '../i18n/dict';

interface AIActionPanelProps {
  taskName: string
  taskText: string
  apiKey: string
  t: (key: DictKey) => string
  onImproveText: (newText: string) => void
  onSplitSubtasks: (names: string[]) => void
  onClose: () => void
}

type AIStatus = 'idle' | 'loading' | 'result' | 'error'

const AIActionPanel: React.FC<AIActionPanelProps> = ({
  taskName, taskText, apiKey, t, onImproveText, onSplitSubtasks, onClose
}) => {
  const [status, setStatus] = useState<AIStatus>('idle')
  const [action, setAction] = useState<'improve' | 'split' | null>(null)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const runImprove = useCallback(async () => {
    setAction('improve')
    setStatus('loading')
    setError('')
    try {
      const improved = await improveText(taskText || taskName, apiKey)
      setResult(improved)
      setStatus('result')
    } catch (err: any) {
      setError(err.message || t('ai.error'))
      setStatus('error')
    }
  }, [taskText, taskName, apiKey, t])

  const runSplit = useCallback(async () => {
    setAction('split')
    setStatus('loading')
    setError('')
    try {
      const context = [taskName, taskText].filter(Boolean).join('\n')
      const subtasks = await splitIntoSubtasks(context || 'task', apiKey)
      setResult(subtasks.join('\n'))
      setStatus('result')
    } catch (err: any) {
      setError(err.message || t('ai.error'))
      setStatus('error')
    }
  }, [taskName, taskText, apiKey, t])

  const handleApply = () => {
    if (action === 'improve') {
      onImproveText(result)
    } else if (action === 'split') {
      onSplitSubtasks(result.split('\n').map(s => s.trim()).filter(Boolean))
    }
    onClose()
  }

  if (status === 'idle') {
    return (
      <div className='flex gap-2'>
        <button
          onClick={runImprove}
          disabled={!apiKey}
          className='flex items-center gap-1.5 px-3 py-2 rounded-apple text-xs font-medium bg-apple-blue/10 text-apple-blue hover:bg-apple-blue/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer'
        >
          <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' />
          </svg>
          {t('ai.improve')}
        </button>
        <button
          onClick={runSplit}
          disabled={!apiKey}
          className='flex items-center gap-1.5 px-3 py-2 rounded-apple text-xs font-medium bg-apple-blue/10 text-apple-blue hover:bg-apple-blue/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer'
        >
          <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15' />
          </svg>
          {t('ai.split')}
        </button>
      </div>
    )
  }

  return (
    <div className='rounded-apple border border-apple-gray-100 dark:border-apple-gray-700 bg-white dark:bg-apple-gray-800/60 p-3 space-y-3'>
      {status === 'loading' && (
        <div className='flex items-center gap-2.5 text-sm text-apple-gray-500 dark:text-apple-gray-400'>
          <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
          </svg>
          {t('ai.processing')}
        </div>
      )}

      {status === 'error' && (
        <div className='text-sm text-apple-red'>{error}</div>
      )}

      {status === 'result' && (
        <div className='space-y-2'>
          <textarea
            readOnly
            value={result}
            className='w-full text-sm leading-relaxed text-apple-gray-700 dark:text-apple-gray-300 bg-apple-gray-50 dark:bg-apple-gray-900/50 rounded-apple border border-apple-gray-100 dark:border-apple-gray-700 p-2.5 outline-none resize-none'
            rows={Math.min(result.split('\n').length, 8)}
          />
          <div className='flex gap-2'>
            <button
              onClick={handleApply}
              className='px-3 py-1.5 rounded-apple text-xs font-medium bg-apple-blue text-white hover:bg-apple-blue/90 transition-all cursor-pointer'
            >
              {t('ai.apply')}
            </button>
            <button
              onClick={onClose}
              className='px-3 py-1.5 rounded-apple text-xs font-medium text-apple-gray-500 dark:text-apple-gray-400 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-700 transition-all cursor-pointer'
            >
              {t('ai.cancel')}
            </button>
          </div>
        </div>
      )}

      {(status === 'error') && (
        <div className='flex gap-2'>
          <button
            onClick={action === 'improve' ? runImprove : runSplit}
            className='px-3 py-1.5 rounded-apple text-xs font-medium bg-apple-blue text-white hover:bg-apple-blue/90 transition-all cursor-pointer'
          >
            {t('ai.apply')}
          </button>
          <button
            onClick={onClose}
            className='px-3 py-1.5 rounded-apple text-xs font-medium text-apple-gray-500 dark:text-apple-gray-400 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-700 transition-all cursor-pointer'
          >
            {t('ai.cancel')}
          </button>
        </div>
      )}
    </div>
  )
}

export default AIActionPanel
