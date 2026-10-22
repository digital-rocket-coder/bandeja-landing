import { useEffect, useRef, useState } from "react"

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** true, как только элемент хотя бы раз попал в область видимости */
export function useInViewOnce<T extends Element>(threshold = 0.4) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      (es) => {
        if (es[0]?.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])
  return [ref, seen] as const
}
