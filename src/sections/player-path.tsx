import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { SectionHead } from "@/components/section-head"
import { prefersReducedMotion } from "@/hooks/use-motion"
import { cn } from "@/lib/utils"

const stages = [
  { title: "Первое знакомство", text: "Правила с демонстрациями, счёт, базовые удары и позиции.", res: "Понимание игры и готовность к первым занятиям", access: "Бесплатно", variant: "accent" },
  { title: "Базовая игра", text: "Техника, перемещения, работа в паре и типичные ошибки.", res: "План самостоятельной практики", access: "Платная программа", variant: "secondary" },
  { title: "Продвинутый уровень", text: "Тактика, игровые решения и развитие выбранного стиля.", res: "Индивидуальные задачи и работа над слабостями", access: "Платная программа", variant: "secondary" },
  { title: "Подготовка к турниру", text: "Форматы соревнований, подготовка и разбор матчей.", res: "План участия в первом или следующем турнире", access: "Отдельный модуль", variant: "brand" },
] as const

export function PlayerPath() {
  const [cur, setCur] = useState(0)
  const [auto, setAuto] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!auto || prefersReducedMotion() || !ref.current) return
    let timer: number | undefined
    const io = new IntersectionObserver((es) => {
      window.clearInterval(timer)
      if (es[0]?.isIntersecting) timer = window.setInterval(() => setCur((c) => (c + 1) % 4), 2600)
    }, { threshold: 0.3 })
    io.observe(ref.current)
    return () => { io.disconnect(); window.clearInterval(timer) }
  }, [auto])

  return (
    <section id="path" className="section bg-card border-y">
      <div className="wrap">
        <SectionHead eyebrow="Путь игрока" title="Четыре этапа с понятным результатом на каждом">
          У каждого этапа есть входной уровень, навыки и практическая цель. Первый шаг бесплатный, дальше стоимость зависит от глубины программы и
          объёма обратной связи.
        </SectionHead>
        <div aria-hidden className="relative mt-2 mb-7 hidden h-[46px] lg:block">
          <div className="absolute inset-x-0 top-[22px] h-0.5 bg-[repeating-linear-gradient(90deg,var(--border)_0_10px,transparent_10px_18px)]" />
          <div
            className="bg-accent absolute top-2.5 size-[26px] -translate-x-1/2 rounded-full shadow-[inset_-4px_-4px_0_rgba(0,0,0,.12),0_6px_14px_-4px_rgba(0,0,0,.3)] transition-[left] duration-800 ease-[cubic-bezier(.5,0,.2,1)]"
            style={{ left: `${12.5 + 25 * cur}%` }}
          />
        </div>
        <div ref={ref} className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => { setAuto(false); setCur(i) }}
              aria-pressed={i === cur}
              className={cn(
                "bg-card text-card-foreground grid min-w-0 cursor-pointer content-start gap-3 rounded-[14px] border-[1.5px] p-[22px] text-left transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-[3px]",
                i === cur && "border-brand shadow-[0_18px_40px_-24px_color-mix(in_srgb,var(--brand)_70%,transparent)]"
              )}
            >
              <span className="text-muted-foreground font-mono text-xs tracking-[0.08em]">ЭТАП {i + 1}</span>
              <h3 className="text-[19px] leading-tight font-semibold">{s.title}</h3>
              <p className="text-muted-foreground text-[15px]">{s.text}</p>
              <span className="border-t border-dashed pt-3 text-[15px]">{s.res}</span>
              <Badge variant={s.variant} shape="pill">{s.access}</Badge>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
