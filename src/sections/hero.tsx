import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CourtCanvas } from "@/components/court-canvas"
import { prefersReducedMotion } from "@/hooks/use-motion"

const stats = [
  { value: "58 334", count: 58334, label: "корта в мире, в 6 раз больше, чем в 2016", src: "Playtomic × PwC, 2025" },
  { value: "19,4 млн", label: "игроков в мире", src: "Playtomic × PwC, 2025" },
  { value: "×60", label: "рост числа кортов в России с 2021 года, до 568", src: "Ведомости, окт. 2025" },
  { value: "~100 000", count: 100000, prefix: "~", label: "игроков в России, прогноз на 2030 год — 512 400", src: "Ведомости, 2025" },
]

function CountUp({ value, count, prefix = "" }: { value: string; count?: number; prefix?: string }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || count === undefined || prefersReducedMotion()) return
    let raf = 0
    const io = new IntersectionObserver((es) => {
      if (!es[0]?.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (n: number) => {
        const k = Math.min(1, (n - t0) / 1400)
        el.textContent = prefix + Math.round(count * (1 - Math.pow(1 - k, 3))).toLocaleString("ru-RU")
        if (k < 1) raf = requestAnimationFrame(step)
        else el.textContent = value
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value, count, prefix])
  return <b ref={ref} className="font-display text-[clamp(24px,3.2vw,40px)] font-semibold tracking-[-0.02em] tabular-nums">{value}</b>
}

export function Hero() {
  return (
    <section className="pt-[clamp(36px,6vw,72px)] pb-[clamp(48px,6vw,80px)]">
      <div className="wrap">
        <div className="grid items-center gap-[clamp(28px,4vw,56px)] min-[921px]:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="eyebrow">Платформа обучения паделу · для партнёров и инвесторов</div>
            <h1 className="mt-[18px] text-[clamp(32px,4.9vw,66px)] leading-[1.04] font-bold">
              От первого удара до{" "}
              <span
                className="px-[0.04em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] motion-reduce:!bg-[length:100%_0.26em]"
                style={{
                  background: "linear-gradient(var(--accent),var(--accent)) 0 88% / 0% 0.26em no-repeat",
                  animation: "sweep 1s .5s cubic-bezier(.2,.8,.2,1) forwards",
                }}
              >
                первого турнира
              </span>
            </h1>
            <p className="text-muted-foreground mt-[22px] max-w-[56ch] text-[clamp(17px,1.7vw,20px)]">
              Bandeja — онлайн-школа и цифровой помощник игрока. Курсы проверенных тренеров, ИИ-разбор правил и видео, счёт на корте и
              запись на очные тренировки в одном приложении.
            </p>
            <div className="mt-[30px] flex flex-wrap gap-3">
              <Button asChild size="xl">
                <a href="#idea">
                  Идея за 30 секунд <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="xl" variant="outline">
                <a href="#product">Посмотреть продукт</a>
              </Button>
            </div>
          </div>
          <div className="grid min-w-0 gap-3">
            <div
              className="bg-court-deep relative aspect-[2/1.12] max-w-full overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(10,31,46,.45)]"
              role="img"
              aria-label="Анимация: розыгрыш на корте для падела, вид сверху"
            >
              <CourtCanvas />
            </div>
            <div className="text-muted-foreground font-mono text-xs tracking-[0.06em]">
              <b className="text-foreground">КОРТ 20 × 10 М</b> · стекло и сетка — часть игры
            </div>
          </div>
        </div>

        <div className="mt-[clamp(40px,6vw,72px)] grid grid-cols-2 border-y lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.src + i}
              className={[
                "grid content-start gap-1.5 py-[22px] pr-3 sm:pr-5",
                i % 2 === 1 ? "border-l pl-3 sm:pl-5" : "",
                i === 2 ? "lg:border-l lg:pl-5" : "",
                i >= 2 ? "border-t lg:border-t-0" : "",
              ].join(" ")}
            >
              <CountUp value={s.value} count={s.count} prefix={s.prefix} />
              <span className="text-muted-foreground text-[13.5px] leading-snug sm:text-[14.5px]">{s.label}</span>
              <small className="text-muted-foreground font-mono text-[11px] opacity-85">{s.src}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
