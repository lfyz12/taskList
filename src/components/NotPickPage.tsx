import React, {useContext} from 'react';
import {Context} from "../index";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";

const NotPickPage = () => {
  const {taskStore} = useContext(Context)
  const hasTasks = taskStore.taskList.length > 0

  return (
    <div className='flex items-center justify-center h-full w-full p-6 md:p-12'>
      <div className='text-center max-w-md px-2 md:px-0'>
        {hasTasks ? (
          <>
            <div className='w-14 h-14 md:w-16 md:h-16 mx-auto mb-5 md:mb-6 rounded-full bg-apple-blue/10 flex items-center justify-center'>
              <svg className='w-7 h-7 md:w-8 md:h-8 text-apple-blue' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' />
              </svg>
            </div>
            <h2 className='text-lg md:text-xl font-semibold text-apple-gray-900 dark:text-apple-gray-100 mb-2'>{taskStore.t('app.selectTask')}</h2>
            <p className='text-sm md:text-base text-apple-gray-400 dark:text-apple-gray-500 leading-relaxed'>
              {taskStore.t('app.selectHint')}
            </p>
          </>
        ) : (
          <>
            <div className='w-14 h-14 md:w-16 md:h-16 mx-auto mb-5 md:mb-6 rounded-full bg-apple-blue/10 flex items-center justify-center'>
              <svg className='w-7 h-7 md:w-8 md:h-8 text-apple-blue' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
              </svg>
            </div>
            <h2 className='text-lg md:text-xl font-semibold text-apple-gray-900 dark:text-apple-gray-100 mb-2'>{taskStore.t('app.welcome')}</h2>
            <p className='text-sm md:text-base text-apple-gray-400 dark:text-apple-gray-500 leading-relaxed mb-6 md:mb-8'>
              {taskStore.t('app.welcomeDesc')}
            </p>
            <Link
              to='new'
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-apple-blue text-white text-sm font-medium rounded-apple shadow-apple-sm hover:bg-apple-blue/90 transition-all'
            >
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
              </svg>
              {taskStore.t('app.createFirst')}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default observer(NotPickPage);
