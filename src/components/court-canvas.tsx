import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/hooks/use-motion"

type Pt = { x: number; y: number }
type Seg = { a: Pt; b: Pt; d: number; pk: number }
type Player = { side: 0 | 1; x: number; y: number; tx: number; ty: number }

/** Корт 20 × 10 м, вид сверху: розыгрыш с отскоками от стекла. Чистый canvas, без зависимостей. */
export function CourtCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const cx = cv.getContext("2d")
    if (!cx) return
    const RM = prefersReducedMotion()
    const css = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim()
    let W = 0, H = 0, S = 1, ox = 0, oy = 0
    const size = () => {
      const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2)
      cv.width = r.width * d; cv.height = r.height * d; cx.setTransform(d, 0, 0, d, 0, 0)
      W = r.width; H = r.height; S = Math.min((W - 36) / 20, (H - 36) / 10); ox = (W - 20 * S) / 2; oy = (H - 10 * S) / 2
    }
    const P = (x: number, y: number) => [ox + x * S, oy + y * S] as const
    const players: Player[] = [
      { side: 0, x: 7, y: 2.6, tx: 7, ty: 2.6 }, { side: 0, x: 7.5, y: 7.4, tx: 7.5, ty: 7.4 },
      { side: 1, x: 13, y: 2.6, tx: 13, ty: 2.6 }, { side: 1, x: 12.5, y: 7.4, tx: 12.5, ty: 7.4 },
    ]
    let shot: { segs: Seg[]; i: number; u: number } | null = null
    let side: 0 | 1 = 0
    let ball = { x: 7, y: 2.6, h: 1 }
    let trail: typeof ball[] = []
    let flash: { w: string | null; a: number } = { w: null, a: 0 }
    const rnd = (a: number, b: number) => a + Math.random() * (b - a)
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

    const newShot = () => {
      const from = side, to = (1 - side) as 0 | 1, dir = to ? 1 : -1
      const start = { x: ball.x, y: ball.y }
      const bx = to ? rnd(13, 18.2) : rnd(1.8, 7), by = rnd(1.2, 8.8)
      const segs: Seg[] = [{ a: start, b: { x: bx, y: by }, d: rnd(0.8, 1.05), pk: rnd(1.4, 2.4) }]
      let end: Pt
      if (Math.random() < 0.5) {
        const wall = { x: to ? 20 : 0, y: clamp(by + rnd(-1.4, 1.4), 0.5, 9.5) }
        segs.push({ a: segs[0].b, b: wall, d: 0.38, pk: 0.9 })
        end = { x: to ? rnd(15.5, 17.8) : rnd(2.2, 4.5), y: clamp(wall.y + rnd(-1.2, 1.2), 1, 9) }
        segs.push({ a: wall, b: end, d: 0.5, pk: 0.7 })
      } else {
        end = { x: clamp(bx + dir * rnd(1, 2.2), 0.8, 19.2), y: clamp(by + rnd(-1, 1), 1, 9) }
        segs.push({ a: segs[0].b, b: end, d: 0.42, pk: 0.8 })
      }
      const rcv = players.filter((p) => p.side === to).sort((a, b) => Math.abs(a.y - end.y) - Math.abs(b.y - end.y))
      rcv[0].tx = end.x; rcv[0].ty = end.y
      rcv[1].ty = end.y < 5 ? rnd(6.5, 8.2) : rnd(1.8, 3.5); rcv[1].tx = to ? rnd(12.5, 15) : rnd(5, 7.5)
      players.filter((p) => p.side === from).forEach((p) => (p.tx = from ? rnd(11.8, 13.2) : rnd(6.8, 8.2)))
      shot = { segs, i: 0, u: 0 }; side = to
    }

    const line = (a: number, b: number, c: number, d: number) => {
      const p = P(a, b), q = P(c, d); cx.beginPath(); cx.moveTo(p[0], p[1]); cx.lineTo(q[0], q[1]); cx.stroke()
    }
    const drawCourt = () => {
      cx.fillStyle = css("--court-deep"); cx.fillRect(0, 0, W, H)
      const [x0, y0] = P(0, 0)
      cx.fillStyle = css("--court"); cx.fillRect(x0, y0, 20 * S, 10 * S)
      cx.globalAlpha = 0.06; cx.fillStyle = "#fff"
      for (let i = 0; i < 20; i += 2) cx.fillRect(P(i, 0)[0], y0, S, 10 * S)
      cx.globalAlpha = 1
      cx.strokeStyle = "rgba(255,255,255,.92)"; cx.lineWidth = Math.max(1.5, S * 0.06)
      line(3.05, 0, 3.05, 10); line(16.95, 0, 16.95, 10); line(3.05, 5, 16.95, 5)
      cx.save(); cx.lineWidth = Math.max(2.5, S * 0.12); cx.strokeStyle = "rgba(255,255,255,.95)"; line(10, -0.15, 10, 10.15); cx.restore()
      cx.save(); cx.setLineDash([2, 3]); cx.strokeStyle = "rgba(255,255,255,.35)"; cx.lineWidth = S * 0.35; line(10, 0, 10, 10); cx.restore()
      const glass = (a: number, b: number, c: number, d: number, key?: string) => {
        cx.save()
        const hit = key && flash.w === key
        cx.strokeStyle = `rgba(210,236,255,${hit ? 0.55 + flash.a * 0.45 : 0.55})`; cx.lineWidth = Math.max(4, S * 0.22)
        if (hit) { cx.shadowColor = "#F1C823"; cx.shadowBlur = 18 * flash.a }
        line(a, b, c, d); cx.restore()
      }
      glass(0, 0, 0, 10, "L"); glass(20, 0, 20, 10, "R")
      glass(0, 0, 4, 0); glass(16, 0, 20, 0); glass(0, 10, 4, 10); glass(16, 10, 20, 10)
      cx.save(); cx.setLineDash([3, 4]); cx.strokeStyle = "rgba(255,255,255,.4)"; cx.lineWidth = Math.max(2, S * 0.1); line(4, 0, 16, 0); line(4, 10, 16, 10); cx.restore()
    }
    const drawPlayers = () => players.forEach((p) => {
      const [x, y] = P(p.x, p.y), r = Math.max(7, S * 0.42)
      cx.fillStyle = "rgba(0,0,0,.25)"; cx.beginPath(); cx.ellipse(x + 3, y + 4, r, r * 0.8, 0, 0, 7); cx.fill()
      cx.fillStyle = p.side ? "#0B1B28" : "#FFFFFF"; cx.beginPath(); cx.arc(x, y, r, 0, 7); cx.fill()
      cx.strokeStyle = p.side ? "#F1C823" : "#1D5BA3"; cx.lineWidth = 3; cx.stroke()
    })
    const drawBall = () => {
      trail.forEach((q, i) => {
        const [x, y] = P(q.x, q.y), a = i / trail.length
        cx.fillStyle = `rgba(241,200,35,${a * 0.35})`; cx.beginPath(); cx.arc(x, y - q.h * S * 0.55, Math.max(1.5, S * 0.12 * a + 1), 0, 7); cx.fill()
      })
      const [x, y] = P(ball.x, ball.y), lift = ball.h * S * 0.55, r = Math.max(4, S * 0.2) * (1 + ball.h * 0.12)
      cx.fillStyle = "rgba(0,0,0,.28)"; cx.beginPath(); cx.ellipse(x, y, r * 0.9, r * 0.55, 0, 0, 7); cx.fill()
      cx.fillStyle = "#F1C823"; cx.beginPath(); cx.arc(x, y - lift, r, 0, 7); cx.fill()
      cx.strokeStyle = "rgba(255,255,255,.7)"; cx.lineWidth = 1.3; cx.beginPath(); cx.arc(x - r * 0.2, y - lift - r * 0.1, r * 0.7, -0.6, 1.2); cx.stroke()
    }
    const draw = () => { drawCourt(); drawPlayers(); drawBall() }

    let raf = 0, last = performance.now()
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now
      if (!shot) newShot()
      const s = shot!, seg = s.segs[s.i]
      s.u += dt / seg.d
      if (s.u >= 1) {
        if (seg.b.x === 0 || seg.b.x === 20) flash = { w: seg.b.x ? "R" : "L", a: 1 }
        s.i++; s.u = 0
        if (s.i >= s.segs.length) { ball = { ...seg.b, h: 0.9 }; shot = null }
      }
      if (shot) {
        const g = shot.segs[shot.i], u = Math.min(1, shot.u)
        ball = { x: g.a.x + (g.b.x - g.a.x) * u, y: g.a.y + (g.b.y - g.a.y) * u, h: 4 * g.pk * u * (1 - u) + (shot.i === 0 ? (1 - u) * 0.9 : 0) }
      }
      flash.a = Math.max(0, flash.a - dt * 2.2)
      players.forEach((p) => { p.x += (p.tx - p.x) * Math.min(1, dt * 2.6); p.y += (p.ty - p.y) * Math.min(1, dt * 2.6) })
      trail.push({ ...ball }); if (trail.length > 22) trail = trail.slice(-22)
      draw()
      raf = requestAnimationFrame(frame)
    }

    size()
    const ro = new ResizeObserver(() => { size(); if (RM) draw() })
    ro.observe(cv)
    if (RM) draw(); else raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return <canvas ref={ref} className="block size-full" />
}
