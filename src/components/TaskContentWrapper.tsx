import React, {useContext, useEffect, useState, useCallback} from 'react';
import {Context} from "../index";
import {useParams, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import NotionContent from "./NotionContent";

const TaskContentWrapper = () => {
  const {taskStore} = useContext(Context)
  const {taskId} = useParams()
  const navigate = useNavigate()

  const task = taskId ? taskStore.findTaskById(taskId) : null

  const [name, setName] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    if (task) {
      setName(task.name)
      setText(task.text)
      taskStore.setFocusedTaskId(task.id)
    } else if (taskId) {
      setName('')
      setText('')
    }
  }, [taskId])

  const handleSaveName = useCallback(() => {
    if (task && name.trim() && name !== task.name) {
      taskStore.updateTask(task.id, {name: name.trim()})
    }
  }, [task, name, taskStore])

  const handleSaveText = useCallback(() => {
    if (task && text !== task.text) {
      taskStore.updateTask(task.id, {text})
    }
  }, [task, text, taskStore])

  if (!task) {
    return (
      <div className='flex items-center justify-center h-full p-6'>
        <div className='text-center'>
          <p className='text-apple-gray-400 dark:text-apple-gray-500 mb-2'>{taskStore.t('app.taskNotFound')}</p>
          <button
            onClick={() => navigate('/taskList')}
            className='text-sm text-apple-blue hover:text-apple-blue/80 transition-colors'
          >
            {taskStore.t('app.goBack')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full p-4 md:p-8 pt-14 lg:pt-8'>
      <input
        type='text'
        value={name}
        onChange={e => setName(e.target.value)}
        onBlur={handleSaveName}
        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); (e.target as HTMLInputElement).blur() } }}
        className='w-full text-xl md:text-2xl font-semibold text-apple-gray-900 dark:text-apple-gray-100 placeholder-apple-gray-300 dark:placeholder-apple-gray-600 bg-transparent border-none outline-none mb-3'
      />

      <div className='h-px bg-apple-gray-100 dark:bg-apple-gray-700 mb-4 md:mb-5'/>

      <div className='flex items-start gap-2 mb-2'>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={handleSaveText}
          className='flex-1 text-sm leading-relaxed text-apple-gray-600 dark:text-apple-gray-400 placeholder-apple-gray-300 dark:placeholder-apple-gray-600 bg-transparent border-none outline-none resize-none'
          placeholder={taskStore.t('task.addNotes')}
          rows={3}
        />
        <div className='shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-apple text-[11px] font-semibold text-apple-gray-400 dark:text-apple-gray-500 bg-apple-gray-50/50 dark:bg-apple-gray-800/30 border border-apple-gray-100/60 dark:border-apple-gray-700/60'>
          <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z' />
          </svg>
          {taskStore.t('ai.comingSoon')}
        </div>
      </div>

      <div className='h-px bg-apple-gray-100 dark:bg-apple-gray-700 mb-4 md:mb-5'/>
      <NotionContent taskId={task.id} blocks={task.blocks || []}/>
    </div>
  );
};

export default observer(TaskContentWrapper);
