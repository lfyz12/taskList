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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={handleSaveText}
        className='w-full text-sm leading-relaxed text-apple-gray-600 dark:text-apple-gray-400 placeholder-apple-gray-300 dark:placeholder-apple-gray-600 bg-transparent border-none outline-none resize-none mb-4 md:mb-6'
        placeholder={taskStore.t('task.addNotes')}
        rows={3}
      />

      <div className='h-px bg-apple-gray-100 dark:bg-apple-gray-700 mb-4 md:mb-5'/>
      <NotionContent taskId={task.id} blocks={task.blocks || []}/>
    </div>
  );
};

export default observer(TaskContentWrapper);
