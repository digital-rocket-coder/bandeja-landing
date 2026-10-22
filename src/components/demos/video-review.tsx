import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/hooks/use-motion"

function ReviewCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const vc = ref.current
    const vx = vc?.getContext("2d")
    if (!vc || !vx) return
    const RM = prefersReducedMotion()
    let raf = 0
    const draw = (tm: number) => {
      const r = vc.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2)
      if (vc.width !== Math.round(r.width * d)) { vc.width = r.width * d; vc.height = r.height * d }
      vx.setTransform(d, 0, 0, d, 0, 0)
      const w = r.width, h = r.height
      const g = vx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, "#0f3561"); g.addColorStop(1, "#1E5AA0")
      vx.fillStyle = g; vx.fillRect(0, 0, w, h)
      vx.fillStyle = "rgba(200,230,255,.12)"; vx.fillRect(0, 0, w, h * 0.32)
      const ln = (a: number, b: number, c: number, e: number) => { vx.beginPath(); vx.moveTo(a * w, b * h); vx.lineTo(c * w, e * h); vx.stroke() }
      vx.strokeStyle = "rgba(255,255,255,.75)"; vx.lineWidth = 2
      ln(0.18, 0.32, 0.02, 1); ln(0.82, 0.32, 0.98, 1); ln(0.18, 0.32, 0.82, 0.32); ln(0.12, 0.55, 0.88, 0.55); ln(0.5, 0.55, 0.5, 1)
      vx.strokeStyle = "rgba(255,255,255,.3)"; vx.lineWidth = 1
      for (let i = 0; i < 12; i++) ln(0.18 + i * 0.0545, 0, 0.18 + i * 0.0545, 0.32)
      const k = RM ? 0 : Math.sin(tm / 600) * 0.012
      const px = 0.63 * w, py = 0.72 * h, s = h * 0.2
      vx.strokeStyle = "#F4F7FA"; vx.fillStyle = "#F4F7FA"; vx.lineWidth = Math.max(3, s * 0.09); vx.lineCap = "round"
      vx.beginPath(); vx.arc(px, py - s * 1.55, s * 0.16, 0, 7); vx.fill()
      vx.beginPath(); vx.moveTo(px, py - s * 1.38); vx.lineTo(px, py - s * 0.7); vx.lineTo(px - s * 0.3, py); vx.moveTo(px, py - s * 0.7); vx.lineTo(px + s * 0.32, py); vx.stroke()
      vx.beginPath(); vx.moveTo(px, py - s * 1.25); vx.lineTo(px + s * (0.45 + k * 8), py - s * (1.0 + k * 10)); vx.stroke()
      vx.strokeStyle = "#0B1B28"; vx.lineWidth = Math.max(5, s * 0.14)
      vx.beginPath(); vx.ellipse(px + s * (0.6 + k * 8), py - s * (1.12 + k * 10), s * 0.13, s * 0.18, 0.4, 0, 7); vx.stroke()
      const bt = RM ? 0.5 : (tm / 1800) % 1
      vx.fillStyle = "#F1C823"; vx.beginPath(); vx.arc((0.25 + bt * 0.42) * w, (0.5 - Math.sin(bt * Math.PI) * 0.18) * h, Math.max(3, h * 0.022), 0, 7); vx.fill()
      if (!RM) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} className="block size-full" />
}

const marks = [
  { at: 14, good: true }, { at: 31, good: false }, { at: 52, good: true }, { at: 70, good: false }, { at: 88, good: false },
]

export function VideoReview() {
  return (
    <>
      <div className="bg-court-deep relative aspect-video max-w-full overflow-hidden rounded-[14px]">
        <ReviewCanvas />
        <div className="border-accent absolute top-[30%] left-[56%] h-[44%] w-[15%] rounded-[10px] border-2 [animation:pulse-ring_2.4s_infinite]" />
        <div className="absolute top-[7%] left-[4%] max-w-[58%] rounded-lg bg-[rgba(7,21,33,.88)] px-2.5 py-[7px] text-[12.5px] text-[#EAF2F8]">
          00:42 · поздняя подготовка ракетки к удару у стекла
        </div>
      </div>
      <div aria-hidden className="relative mt-3.5 h-[34px]">
        <div className="bg-muted absolute inset-x-0 top-[15px] h-1 rounded-sm" />
        <div className="bg-brand absolute top-[15px] left-0 h-1 w-0 rounded-sm [animation:play_9s_linear_infinite]" />
        {marks.map((m) => (
          <span
            key={m.at}
            className={`border-card absolute top-2 -ml-[9px] size-[18px] rounded-full border-[3px] ${m.good ? "bg-success" : "bg-accent"}`}
            style={{ left: `${m.at}%` }}
          />
        ))}
      </div>
      <div className="mt-2.5 grid gap-2">
        {[
          ["00:42", "Поздняя подготовка.", "Ракетка уходит назад уже после отскока от стекла. Упражнение: «замах до отскока», 3 × 10."],
          ["01:15", "Хорошо.", "Своевременный выход к сетке после лоба соперника."],
        ].map(([t, b, s]) => (
          <div key={t} className="grid grid-cols-[56px_minmax(0,1fr)] gap-3 border-t py-2.5 text-[14.5px]">
            <span className="text-muted-foreground font-mono text-[13px]">{t}</span>
            <span><b className="font-semibold">{b}</b> {s}</span>
          </div>
        ))}
      </div>
    </>
  )
}
