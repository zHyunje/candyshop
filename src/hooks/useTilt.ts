import { useRef, useCallback } from 'react'

const useTilt = (intensity = 10) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseStopped = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onMouseEnter = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (mouseStopped.current) clearTimeout(mouseStopped.current)
    el.style.transition = 'transform 150ms ease-out'
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return

      const { left, top, width, height } = el.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      el.style.transition = 'transform 80ms ease-out'
      el.style.transform = `perspective(600px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`

      if (mouseStopped.current) clearTimeout(mouseStopped.current)
      mouseStopped.current = setTimeout(() => {
        el.style.transition = 'transform 400ms ease-out'
        el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)'
      }, 800)
    },
    [intensity],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (mouseStopped.current) clearTimeout(mouseStopped.current)
    el.style.transition = 'transform 300ms ease-out'
    el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)'
  }, [])

  return { ref, onMouseEnter, onMouseMove, onMouseLeave }
}

export default useTilt
