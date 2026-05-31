import React, {FC, useContext, useRef, useEffect, useState} from 'react';
import {IBlock} from "../types/types";
import {Context} from "../index";

interface DrawBlockProps {
  block: IBlock
  onUpdate: (blockId: string, fields: Partial<IBlock>) => void
}

const DrawBlock: FC<DrawBlockProps> = ({block, onUpdate}) => {
  const {taskStore} = useContext(Context)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const lastPos = useRef<{x: number; y: number} | null>(null)
  const isDark = taskStore.theme === 'dark'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    ctx.strokeStyle = isDark ? '#AEAEB2' : '#363639'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (block.drawing) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height)
      img.src = block.drawing
    } else {
      ctx.fillStyle = isDark ? '#2C2C2E' : '#F5F5F7'
      ctx.fillRect(0, 0, rect.width, rect.height)
    }
  }, [block.drawing, isDark])

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>): {x: number; y: number} | null => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    return {x: e.clientX - rect.left, y: e.clientY - rect.top}
  }

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const pos = getPos(e)
    if (!pos) return
    e.preventDefault()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    setDrawing(true)
    lastPos.current = pos
    setHasDrawn(true)
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) return
    const pos = getPos(e)
    if (!pos || !lastPos.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    lastPos.current = pos
  }

  const stopDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (drawing) {
      e.preventDefault()
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    }
    setDrawing(false)
    lastPos.current = null
  }

  const saveDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    onUpdate(block.id, {drawing: canvas.toDataURL()})
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.fillStyle = isDark ? '#2C2C2E' : '#F5F5F7'
    ctx.fillRect(0, 0, rect.width, rect.height)
    setHasDrawn(false)
    onUpdate(block.id, {drawing: undefined})
  }

  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-2'>
        <button
          onClick={saveDrawing}
          disabled={!hasDrawn}
          className={`px-3 py-1.5 text-xs font-medium rounded-apple transition-all ${
            hasDrawn
              ? 'bg-apple-blue text-white shadow-apple-sm hover:bg-apple-blue/90'
              : 'bg-apple-gray-100 dark:bg-apple-gray-700 text-apple-gray-300 dark:text-apple-gray-600 cursor-not-allowed'
          }`}
        >
          {taskStore.t('block.saveDrawing')}
        </button>
        <button
          onClick={clearCanvas}
          className='px-3 py-1.5 text-xs font-medium text-apple-gray-400 dark:text-apple-gray-500 hover:text-apple-red rounded-apple hover:bg-apple-red/5 transition-all'
        >
          {taskStore.t('block.clear')}
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className='w-full h-48 rounded-apple cursor-crosshair border border-apple-gray-100 dark:border-apple-gray-700 touch-none'
        onPointerDown={startDraw}
        onPointerMove={draw}
        onPointerUp={stopDraw}
        onPointerLeave={stopDraw}
      />
    </div>
  );
};

export default DrawBlock;
