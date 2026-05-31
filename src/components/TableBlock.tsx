import React, {FC, useContext, useState, useEffect, useCallback} from 'react';
import {IBlock} from "../types/types";
import {Context} from "../index";

interface TableBlockProps {
  block: IBlock
  onUpdate: (blockId: string, fields: Partial<IBlock>) => void
}

const TableBlock: FC<TableBlockProps> = ({block, onUpdate}) => {
  const {taskStore} = useContext(Context)
  const rows = block.rows || [['', '']]
  const colCount = block.colCount || 2

  const [localRows, setLocalRows] = useState<string[][]>(rows)

  useEffect(() => {
    setLocalRows(block.rows || [['', '']])
  }, [block.rows])

  const commit = useCallback(() => {
    const clean = localRows.map(r => [...r])
    onUpdate(block.id, {rows: clean, colCount: clean[0]?.length || 1})
  }, [localRows, block.id, onUpdate])

  const updateCell = (r: number, c: number, val: string) => {
    setLocalRows(prev => {
      const next = prev.map(row => [...row])
      next[r][c] = val
      return next
    })
  }

  const addRow = () => {
    setLocalRows(prev => [...prev, Array(prev[0]?.length || colCount).fill('')])
  }

  const addColumn = () => {
    setLocalRows(prev => prev.map(row => [...row, '']))
  }

  const deleteRow = (r: number) => {
    if (localRows.length <= 1) return
    setLocalRows(prev => prev.filter((_, i) => i !== r))
  }

  const deleteColumn = (c: number) => {
    if ((localRows[0]?.length || 0) <= 1) return
    setLocalRows(prev => prev.map(row => row.filter((_, i) => i !== c)))
  }

  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead>
          <tr>
            {Array.from({length: localRows[0]?.length || colCount}).map((_, c) => (
              <th key={c} className='relative group/th min-w-[80px] border border-apple-gray-200 dark:border-apple-gray-700 p-0'>
                <input
                  value=''
                  readOnly
                  className='w-full px-2 py-1.5 text-[11px] font-semibold text-apple-gray-400 dark:text-apple-gray-500 uppercase tracking-wider bg-apple-gray-50 dark:bg-apple-gray-800 outline-none'
                />
                <button
                  onClick={() => deleteColumn(c)}
                  className='absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center rounded-full bg-white dark:bg-apple-gray-700 border border-apple-gray-200 dark:border-apple-gray-600 text-apple-gray-300 dark:text-apple-gray-500 hover:text-apple-red hover:border-apple-red/30 opacity-0 group-hover/th:opacity-100 transition-all text-[10px]'
                  title={taskStore.t('table.deleteColumn')}
                >
                  <svg className='w-2.5 h-2.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </th>
            ))}
            <th className='w-8 border border-apple-gray-200 dark:border-apple-gray-700 p-0 bg-apple-gray-50 dark:bg-apple-gray-800'>
              <button
                onClick={addColumn}
                className='w-full h-full flex items-center justify-center text-apple-gray-300 dark:text-apple-gray-500 hover:text-apple-blue transition-colors py-1.5'
                title={taskStore.t('table.addColumn')}
              >
                <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
                </svg>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {localRows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} className='relative group/td border border-apple-gray-200 dark:border-apple-gray-700 p-0'>
                  <input
                    value={cell}
                    onChange={e => updateCell(r, c, e.target.value)}
                    onBlur={commit}
                    className='w-full px-2 py-1.5 text-sm text-apple-gray-700 dark:text-apple-gray-300 bg-transparent outline-none'
                  />
                  {c === 0 && (
                    <button
                      onClick={() => deleteRow(r)}
                      className='absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full bg-white dark:bg-apple-gray-700 border border-apple-gray-200 dark:border-apple-gray-600 text-apple-gray-300 dark:text-apple-gray-500 hover:text-apple-red hover:border-apple-red/30 opacity-0 group-hover/td:opacity-100 transition-all text-[10px]'
                      title={taskStore.t('table.deleteRow')}
                    >
                      <svg className='w-2.5 h-2.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  )}
                </td>
              ))}
              <td className='w-8 border border-apple-gray-200 dark:border-apple-gray-700 p-0 bg-apple-gray-50 dark:bg-apple-gray-800'>
                <button
                  onClick={r === localRows.length - 1 ? addRow : undefined}
                  className={`w-full h-full flex items-center justify-center py-1.5 transition-colors ${r === localRows.length - 1 ? 'text-apple-gray-300 dark:text-apple-gray-500 hover:text-apple-blue' : 'pointer-events-none opacity-0'}`}
                  title={taskStore.t('table.addRow')}
                >
                  <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBlock;
