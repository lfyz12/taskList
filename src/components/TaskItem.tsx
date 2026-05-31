import React, {FC, useContext, useState} from 'react';
import {ITask} from "../types/types";
import {Context} from "../index";
import TaskList from "./TaskList";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

interface TaskItemProps {
  task: ITask
  depth: number
}

const TaskItem: FC<TaskItemProps> = ({task, depth}) => {
  const {taskStore} = useContext(Context)
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const isFocused = taskStore.focusedTaskId === task.id
  const hasChildren = task.taskList.length > 0

  const handleSelect = () => {
    taskStore.setFocusedTaskId(task.id)
  }

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    taskStore.setFocusedTaskId(task.id)
    navigate(`/taskList/taskItem/${task.id}`)
  }

  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation()
    taskStore.toggleTask(task.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    taskStore.deleteTask(task.id)
  }

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(prev => !prev)
  }

  const handleAddSubtask = (e: React.MouseEvent) => {
    e.stopPropagation()
    taskStore.setFocusedTaskId(task.id)
    navigate('/taskList/new')
  }

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`
          group flex items-center gap-2.5 px-3 py-3 lg:py-2.5 rounded-apple cursor-default
          transition-all duration-150 select-none min-h-[44px] lg:min-h-0
          ${isFocused
            ? 'bg-apple-blue/8 shadow-apple-sm'
            : 'hover:bg-apple-gray-50 dark:hover:bg-apple-gray-700/50'
          }
        `}
        style={{paddingLeft: `${Math.min(12 + depth * 14, 40)}px`}}
      >

        {/* Expand indicator */}
        <button
          onClick={handleExpand}
          className={`
            shrink-0 flex items-center justify-center rounded
            transition-all duration-150 cursor-pointer
            w-6 h-6 lg:w-5 lg:h-5
            ${hasChildren
              ? 'text-apple-gray-400 hover:text-apple-gray-600 dark:hover:text-apple-gray-300 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-700 opacity-100'
              : 'opacity-0 pointer-events-none'
            }
          `}
        >
          <svg
            className={`w-4 h-4 lg:w-3.5 lg:h-3.5 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
            fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
          </svg>
        </button>

        {/* Checkbox */}
        <button
          onClick={handleCheck}
          className={`
            shrink-0 rounded-full border-2 flex items-center justify-center
            transition-all duration-150 cursor-pointer
            w-6 h-6 lg:w-5 lg:h-5
            ${task.status
              ? 'bg-apple-green border-apple-green text-white'
              : 'border-apple-gray-300 dark:border-apple-gray-500 hover:border-apple-blue dark:hover:border-apple-blue group-hover:border-apple-gray-400 dark:group-hover:border-apple-gray-400'
            }
          `}
        >
          {task.status && (
            <svg className='w-3.5 h-3.5 lg:w-3 lg:h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
          )}
        </button>

        {/* Name */}
        <span
          onClick={handleOpen}
          className={`
            flex-1 min-w-0 truncate transition-all duration-150 cursor-pointer
            text-sm lg:text-sm
            ${task.status
              ? 'text-apple-gray-400 dark:text-apple-gray-500 line-through'
              : isFocused
                ? 'text-apple-gray-900 dark:text-apple-gray-100 font-semibold'
                : 'text-apple-gray-700 dark:text-apple-gray-300 font-medium group-hover:text-apple-gray-900 dark:group-hover:text-apple-gray-100'
            }
          `}
        >
          {task.name}
        </span>

        {/* Subtask count badge */}
        {hasChildren && (
          <span className='shrink-0 text-xs text-apple-gray-400 dark:text-apple-gray-500 font-medium tabular-nums'>
            {task.taskList.length}
          </span>
        )}

        {/* Actions — always visible on mobile, hover-only on desktop */}
        <div className='shrink-0 flex items-center gap-0.5 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-150'>
          <button
            onClick={handleOpen}
            className='w-8 h-8 lg:w-6 lg:h-6 flex items-center justify-center rounded text-apple-gray-400 dark:text-apple-gray-500 hover:text-apple-blue hover:bg-apple-blue/5 transition-all'
            title={taskStore.t('task.open')}
          >
            <svg className='w-4 h-4 lg:w-3.5 lg:h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25' />
            </svg>
          </button>
          <button
            onClick={handleAddSubtask}
            className='w-8 h-8 lg:w-6 lg:h-6 flex items-center justify-center rounded text-apple-gray-400 dark:text-apple-gray-500 hover:text-apple-blue hover:bg-apple-blue/5 transition-all'
            title={taskStore.t('task.addSubtask')}
          >
            <svg className='w-4 h-4 lg:w-3.5 lg:h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className='w-8 h-8 lg:w-6 lg:h-6 flex items-center justify-center rounded text-apple-gray-400 dark:text-apple-gray-500 hover:text-apple-red hover:bg-apple-red/5 transition-all'
            title={taskStore.t('task.deleteTask')}
          >
            <svg className='w-4 h-4 lg:w-3.5 lg:h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
            </svg>
          </button>
        </div>

      </div>

      {expanded && hasChildren && (
        <div className='ml-1 lg:ml-2 mt-0.5'>
          <TaskList tasks={task.taskList} depth={depth + 1}/>
        </div>
      )}
    </div>
  );
};

export default observer(TaskItem);
