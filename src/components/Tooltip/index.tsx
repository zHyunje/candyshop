import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type TooltipProps = {
  text: string
  pos?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-right'
  children: React.ReactNode
}

const Tooltip = ({ text, pos = 'top', children }: TooltipProps) => {
  const [visible, setVisible] = useState(false)
  const [style, setStyle] = useState<React.CSSProperties>({})
  const ref = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current || !tooltipRef.current) return

    const rect = ref.current.getBoundingClientRect()
    const tip = tooltipRef.current.getBoundingClientRect()
    const gap = 8

    const positions: Record<string, React.CSSProperties> = {
      top: { top: rect.top - tip.height - gap, left: rect.left + rect.width / 2 - tip.width / 2 },
      bottom: { top: rect.bottom + gap, left: rect.left + rect.width / 2 - tip.width / 2 },
      left: { top: rect.top + rect.height / 2 - tip.height / 2, left: rect.left - tip.width - gap },
      right: { top: rect.top + rect.height / 2 - tip.height / 2, left: rect.right + gap },
      'bottom-right': {
        top: rect.bottom + gap,
        left: rect.right - tip.width,
      },
    }

    setStyle(positions[pos])
  }, [visible, pos])

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {createPortal(
        <div
          ref={tooltipRef}
          style={{ ...style, visibility: visible ? 'visible' : 'hidden' }}
          className={`
            fixed z-9999 px-2 py-1 text-xs rounded-md whitespace-nowrap
            bg-zinc-800 text-white pointer-events-none
            transition-opacity duration-150
            ${visible ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {text}
        </div>,
        document.body,
      )}
    </div>
  )
}

export default Tooltip
