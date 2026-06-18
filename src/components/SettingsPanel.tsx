import React, {useContext, useRef, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Lang} from "../i18n/dict";

interface SettingsPanelProps {
  onClose?: () => void
}

const LANG_LABELS: Record<Lang, string> = { en: 'EN', ru: 'RU', es: 'ES', zh: 'ZH' }

const SettingsPanel: React.FC<SettingsPanelProps> = ({onClose}) => {
  const {taskStore} = useContext(Context)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose?.()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <div
      ref={ref}
      className='fixed lg:absolute top-16 lg:top-12 right-3 z-50 w-[calc(100vw-24px)] max-w-[280px] lg:w-56 bg-white dark:bg-apple-gray-800 rounded-apple-lg shadow-apple-lg border border-apple-gray-100 dark:border-apple-gray-700 p-4 space-y-4'
    >
      <div>
        <p className='text-[11px] font-semibold text-apple-gray-400 dark:text-apple-gray-300 uppercase tracking-wider mb-2'>
          {taskStore.t('app.theme')}
        </p>
        <div className='flex gap-2'>
          <button
            onClick={() => taskStore.setTheme('light')}
            className={`flex-1 px-3 py-2 md:py-1.5 text-xs font-medium rounded-apple transition-all ${
              taskStore.theme === 'light'
                ? 'bg-apple-blue text-white shadow-apple-sm'
                : 'bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-300 hover:bg-apple-gray-200 dark:hover:bg-apple-gray-600'
            }`}
          >
            <span className='flex items-center justify-center gap-1.5'>
              <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' />
              </svg>
              {taskStore.t('app.light')}
            </span>
          </button>
          <button
            onClick={() => taskStore.setTheme('dark')}
            className={`flex-1 px-3 py-2 md:py-1.5 text-xs font-medium rounded-apple transition-all ${
              taskStore.theme === 'dark'
                ? 'bg-apple-blue text-white shadow-apple-sm'
                : 'bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-600 dark:text-apple-gray-300 hover:bg-apple-gray-200 dark:hover:bg-apple-gray-600'
            }`}
          >
            <span className='flex items-center justify-center gap-1.5'>
              <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' />
              </svg>
              {taskStore.t('app.dark')}
            </span>
          </button>
        </div>
      </div>

      <div>
        <p className='text-[11px] font-semibold text-apple-gray-400 dark:text-apple-gray-300 uppercase tracking-wider mb-2'>
          {taskStore.t('app.language')}
        </p>
        <div className='flex gap-1.5'>
          {(Object.keys(LANG_LABELS) as Lang[]).map(lang => (
            <button
              key={lang}
              onClick={() => taskStore.setLanguage(lang)}
              className={`flex-1 px-2 py-2 md:py-1.5 text-xs font-semibold rounded-apple transition-all ${
                taskStore.language === lang
                  ? 'bg-apple-blue text-white shadow-apple-sm'
                  : 'bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-500 dark:text-apple-gray-400 hover:bg-apple-gray-200 dark:hover:bg-apple-gray-600'
              }`}
            >
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
      </div>


    </div>
  )
}

export default observer(SettingsPanel)
