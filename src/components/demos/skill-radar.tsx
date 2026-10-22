import { Badge } from "@/components/ui/badge"
import { useInViewOnce, prefersReducedMotion } from "@/hooks/use-motion"
import { useEffect, useState } from "react"

const axes = ["Атака", "Защита", "Стабильность", "Перемещения", "Тактика", "Игра в паре"]
const now = [0.5, 0.72, 0.58, 0.6, 0.42, 0.66]
const goal = [0.82, 0.75, 0.7, 0.72, 0.65, 0.74]
const C = [190, 160] as const, R = 95
const ang = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / 6
const pt = (i: number, v: number) => [C[0] + Math.cos(ang(i)) * R * v, C[1] + Math.sin(ang(i)) * R * v] as const
const poly = (vals: number[]) => vals.map((v, i) => pt(i, v).join(",")).join(" ")

export function SkillRadar() {
  const [ref, seen] = useInViewOnce<SVGSVGElement>(0.4)
  const [grown, setGrown] = useState(prefersReducedMotion())
  useEffect(() => { if (seen) setGrown(true) }, [seen])
  useEffect(() => { const t = setTimeout(() => setGrown(true), 4000); return () => clearTimeout(t) }, [])

  return (
    <div className="grid items-center gap-[18px] sm:grid-cols-[minmax(0,1fr)_190px]">
      <svg ref={ref} viewBox="0 0 380 320" className="mx-auto block w-full max-w-[380px]" role="img" aria-label="Пример профиля навыков: текущий уровень и цель">
        {[0.25, 0.5, 0.75, 1].map((l) => <polygon key={l} points={poly(axes.map(() => l))} fill="none" stroke="var(--border)" />)}
        {axes.map((a, i) => {
          const [x, y] = pt(i, 1), [lx, ly] = pt(i, 1.2)
          return (
            <g key={a}>
              <line x1={C[0]} y1={C[1]} x2={x} y2={y} stroke="var(--border)" />
              <text x={lx} y={ly + 4} fontSize={13} fill="var(--muted-foreground)" className="[font-family:var(--font-sans)]" textAnchor={Math.abs(lx - C[0]) < 5 ? "middle" : lx > C[0] ? "start" : "end"}>{a}</text>
            </g>
          )
        })}
        <g style={{ transformOrigin: `${C[0]}px ${C[1]}px`, transform: `scale(${grown ? 1 : 0.2})`, transition: "transform 1.2s cubic-bezier(.2,.8,.2,1)" }}>
          <polygon points={poly(now)} fill="color-mix(in srgb, var(--brand) 28%, transparent)" stroke="var(--brand)" strokeWidth={2} />
          <polygon points={poly(goal)} fill="none" stroke="var(--accent)" strokeWidth={2} strokeDasharray="5 4" />
        </g>
      </svg>
      <div className="grid gap-2.5 text-sm">
        <div className="flex items-center gap-2.5"><i className="bg-brand block h-1 w-[22px] rounded-sm" />Сейчас</div>
        <div className="flex items-center gap-2.5"><i className="block h-1 w-[22px] rounded-sm bg-[repeating-linear-gradient(90deg,var(--accent)_0_5px,transparent_5px_8px)]" />Цель: атакующий стиль</div>
        <div className="mt-1.5 flex flex-wrap gap-2">
          <Badge shape="chip">Курс «Основы»</Badge>
          <Badge shape="chip">Оценка тренера</Badge>
          <Badge shape="chip" variant="outline" className="bg-background">Игра у сетки</Badge>
          <Badge shape="chip" variant="outline" className="bg-background">Первый турнир</Badge>
        </div>
      </div>
    </div>
  )
}
