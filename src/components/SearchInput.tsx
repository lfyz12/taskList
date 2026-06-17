import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const SearchInput: React.FC = () => {
  const {taskStore} = useContext(Context)

  return (
    <div className='relative'>
      <svg
        className='absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-apple-gray-400 dark:text-apple-gray-500 pointer-events-none'
        fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
      </svg>
      <input
        type='text'
        value={taskStore.searchQuery}
        onChange={e => taskStore.setSearchQuery(e.target.value)}
        placeholder={taskStore.t('search.placeholder')}
        className='w-full pl-9 pr-3 py-2 text-xs rounded-apple border border-apple-gray-100 dark:border-apple-gray-700 bg-apple-gray-50 dark:bg-apple-gray-900/50 text-apple-gray-700 dark:text-apple-gray-300 outline-none focus:border-apple-blue/50 focus:ring-1 focus:ring-apple-blue/30 transition-all placeholder-apple-gray-300 dark:placeholder-apple-gray-600'
      />
    </div>
  )
}

export default observer(SearchInput)
