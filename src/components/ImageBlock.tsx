import React, {FC, useContext, useRef} from 'react';
import {IBlock} from "../types/types";
import {Context} from "../index";

interface ImageBlockProps {
  block: IBlock
  onUpdate: (blockId: string, fields: Partial<IBlock>) => void
}

const ImageBlock: FC<ImageBlockProps> = ({block, onUpdate}) => {
  const {taskStore} = useContext(Context)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      onUpdate(block.id, {
        dataUrl: reader.result as string,
        fileName: file.name,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    onUpdate(block.id, {dataUrl: undefined, fileName: undefined})
  }

  if (block.dataUrl) {
    return (
      <div className='group relative rounded-apple overflow-hidden'>
        <img
          src={block.dataUrl}
          alt={block.fileName || 'Uploaded image'}
          className='w-full max-h-80 object-contain rounded-apple bg-apple-gray-50 dark:bg-apple-gray-900'
        />
        <div className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
          {block.fileName && (
            <span className='px-2 py-1 text-[11px] font-medium text-apple-gray-500 dark:text-apple-gray-400 bg-white/80 dark:bg-apple-gray-800/80 backdrop-blur rounded-md truncate max-w-[160px]'>
              {block.fileName}
            </span>
          )}
          <button
            onClick={handleRemove}
            className='w-7 h-7 flex items-center justify-center bg-white/80 dark:bg-apple-gray-800/80 backdrop-blur rounded-md text-apple-gray-400 hover:text-apple-red transition-colors shadow-apple-sm'
            title='Remove image'
          >
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className='flex items-center gap-3 rounded-apple border border-dashed border-apple-gray-200 dark:border-apple-gray-600 cursor-pointer hover:border-apple-blue hover:bg-apple-blue/[0.02] dark:hover:bg-apple-blue/5 transition-all py-2'
    >
      <div className='w-9 h-9 rounded-full bg-apple-gray-100 dark:bg-apple-gray-700 flex items-center justify-center text-apple-gray-400 dark:text-apple-gray-500'>
        <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
        </svg>
      </div>
      <span className='text-sm font-medium text-apple-gray-400 dark:text-apple-gray-500'>{taskStore.t('block.clickToUpload')}</span>
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={handleUpload}
        className='hidden'
      />
    </div>
  );
};

export default ImageBlock;
