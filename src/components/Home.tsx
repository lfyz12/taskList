import React, {useContext, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";
import TaskList from "./TaskList";
import {Context} from "../index";
import SettingsPanel from "./SettingsPanel";

const Home = () => {
  const {taskStore} = useContext(Context)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const hasTasks = taskStore.taskList.length > 0
  const selectedTask = taskStore.focusedTask

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className='flex w-screen h-screen bg-apple-gray-50 dark:bg-apple-gray-900 overflow-hidden'>

      {/* ── Backdrop (mobile only) ── */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-30 bg-black/30 lg:hidden'
          onClick={closeSidebar}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-40
        w-[85vw] max-w-[360px] lg:w-[340px] lg:min-w-[340px]
        h-full flex flex-col bg-white dark:bg-apple-gray-800
        border-r border-apple-gray-100 dark:border-apple-gray-700
        transition-transform duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* Header */}
        <div className='shrink-0 px-4 md:px-5 pt-4 md:pt-5 pb-3 border-b border-apple-gray-100 dark:border-apple-gray-700 relative'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <button
                onClick={closeSidebar}
                className='lg:hidden w-8 h-8 flex items-center justify-center rounded-md text-apple-gray-400 hover:text-apple-gray-600 dark:hover:text-apple-gray-300 hover:bg-apple-gray-50 dark:hover:bg-apple-gray-700 transition-all -ml-1'
              >
                <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
              <div>
                <h1 className='text-sm font-semibold text-apple-gray-900 dark:text-apple-gray-100'>
                  {taskStore.t('app.allTasks')}
                </h1>
                {selectedTask && (
                  <p className='text-xs text-apple-blue mt-0.5 truncate max-w-[160px] md:max-w-[200px]'>
                    {selectedTask.name}
                  </p>
                )}
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className='w-8 h-8 md:w-7 md:h-7 flex items-center justify-center rounded-md text-apple-gray-400 hover:text-apple-gray-600 dark:hover:text-apple-gray-300 hover:bg-apple-gray-50 dark:hover:bg-apple-gray-700 transition-all'
                title={taskStore.t('app.settings')}
              >
                <svg className='w-[18px] h-[18px] md:w-4 md:h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </button>
              <Link
                to='new'
                state={{forceRoot: true}}
                onClick={closeSidebar}
                className='w-8 h-8 md:w-7 md:h-7 flex items-center justify-center rounded-md text-apple-blue hover:bg-apple-blue/5 transition-all'
                title={taskStore.t('app.newTask')}
              >
                <svg className='w-[18px] h-[18px] md:w-5 md:h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
                </svg>
              </Link>
            </div>
          </div>
          {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)}/>}
        </div>

        {/* Task count */}
        <div className='shrink-0 px-4 md:px-5 py-3 border-b border-apple-gray-100 dark:border-apple-gray-700'>
          <span className='text-xs font-medium text-apple-gray-400 dark:text-apple-gray-300 uppercase tracking-wider'>
            {taskStore.taskList.length} {taskStore.taskList.length === 1 ? taskStore.t('app.task') : taskStore.t('app.tasks')}
          </span>
        </div>

        {/* Task list */}
        <div className='flex-1 overflow-y-auto px-3 py-3'>
          {hasTasks ? (
            <TaskList tasks={taskStore.taskList} depth={0}/>
          ) : (
            <div className='flex flex-col items-center justify-center h-40 text-center px-6'>
              <p className='text-sm text-apple-gray-400 dark:text-apple-gray-500 mb-3'>{taskStore.t('app.noTasks')}</p>
              <Link
                to='new'
                state={{forceRoot: true}}
                onClick={closeSidebar}
                className='inline-flex items-center gap-1.5 text-xs font-medium text-apple-blue hover:text-apple-blue/80 transition-colors'
              >
                <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
                </svg>
                {taskStore.t('app.createOne')}
              </Link>
            </div>
          )}
        </div>

      </aside>

      {/* ── Content area ── */}
      <main className='flex-1 h-full overflow-y-auto bg-apple-gray-50 dark:bg-apple-gray-900 relative'>
        {/* Mobile menu button — shown when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className='lg:hidden fixed top-3 left-3 z-20 w-9 h-9 flex items-center justify-center rounded-apple bg-white/90 dark:bg-apple-gray-800/90 backdrop-blur-md shadow-apple-sm border border-apple-gray-100 dark:border-apple-gray-700 text-apple-gray-500 dark:text-apple-gray-400 transition-all active:scale-95'
            title='Open menu'
          >
            <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
        )}
        <div className='h-full lg:max-w-3xl lg:mx-auto'>
          <Outlet/>
        </div>
      </main>

    </div>
  );
};

export default observer(Home);
