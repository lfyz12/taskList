import React, {FC, useContext, useState, useRef, useEffect} from 'react';
import {IBlock} from "../types/types";
import {Context} from "../index";

interface TextBlockProps {
  block: IBlock
  onUpdate: (blockId: string, fields: Partial<IBlock>) => void
}

const TextBlock: FC<TextBlockProps> = ({block, onUpdate}) => {
  const {taskStore} = useContext(Context)
  const [value, setValue] = useState(block.text || '')
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setValue(block.text || '')
  }, [block.text])

  const handleBlur = () => {
    if (value !== block.text) {
      onUpdate(block.id, {text: value})
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      (e.target as HTMLTextAreaElement).blur()
    }
  }

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className='w-full text-sm leading-relaxed text-apple-gray-700 dark:text-apple-gray-300 placeholder-apple-gray-300 dark:placeholder-apple-gray-500 bg-transparent border-none outline-none resize-none overflow-hidden'
      placeholder={taskStore.t('block.typeSomething')}
      rows={1}
    />
  );
};

export default TextBlock;
