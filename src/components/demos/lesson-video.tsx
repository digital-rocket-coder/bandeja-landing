import { useRef, useState } from "react"
import { Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { prefersReducedMotion } from "@/hooks/use-motion"
import { cn } from "@/lib/utils"

const chapters = [
  { t: 0, tc: "0:00", title: "Вступление", d: "Три главных удара в паделе" },
  { t: 16, tc: "0:16", title: "Смэш", d: "Мощный завершающий удар над головой" },
  { t: 46, tc: "0:46", title: "Вибора", d: "Резаный удар с вращением" },
  { t: 67, tc: "1:07", title: "Бандеха", d: "Удар, который держит позицию у сетки" },
]
const base = import.meta.env.BASE_URL

export function LessonVideo() {
  const video = useRef<HTMLVideoElement>(null)
  const phone = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [cur, setCur] = useState(0)

  const startAt = (t?: number) => {
    const v = video.current
    if (!v) return
    if (t !== undefined) { try { v.currentTime = t } catch { /* metadata not loaded yet */ } }
    setStarted(true)
    v.play()?.catch(() => {})
  }

  return (
    <div id="lesson" className="grid items-center gap-[clamp(28px,5vw,72px)] pb-[clamp(36px,5vw,64px)] min-[901px]:grid-cols-[minmax(0,1fr)_auto]">
      <div className="rv grid min-w-0 gap-4">
        <div className="eyebrow">Обучение · пример урока</div>
        <h3 className="text-[clamp(24px,2.8vw,34px)] leading-[1.12] font-semibold">Так выглядит урок: три главных удара над головой</h3>
        <p className="text-muted-foreground">
          Реальный урок от тренера по паделу. Короткие главы, разбор на пальцах и демонстрация на корте. Из таких уроков собирается этап «Базовая игра».
        </p>
        <div className="mt-1.5 grid gap-2">
          {chapters.map((c, i) => (
            <button
              key={c.t}
              type="button"
              onClick={() => {
                startAt(c.t)
                if (window.innerWidth < 900) phone.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" })
              }}
              className={cn(
                "bg-card hover:border-brand grid cursor-pointer grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-3.5 rounded-xl border-[1.5px] px-4 py-[13px] text-left transition-colors",
                started && i === cur && "border-brand bg-[color-mix(in_srgb,var(--brand)_9%,var(--card))]"
              )}
            >
              <span className="text-muted-foreground font-mono text-[13px]">{c.tc}</span>
              <span>
                <b className="block text-base font-semibold">{c.title}</b>
                <span className="text-muted-foreground block text-[13.5px]">{c.d}</span>
              </span>
              <Play className="text-brand size-3.5 fill-current" aria-hidden />
            </button>
          ))}
        </div>
        <p className="text-[15px]">После урока в приложении:</p>
        <div className="flex flex-wrap gap-2">
          {["Упражнение в личный план", "Вопрос аватару тренера", "Загрузить своё видео на разбор"].map((t) => (
            <Badge key={t} variant="outline" shape="chip" className="bg-background">{t}</Badge>
          ))}
        </div>
      </div>

      <div className="rv grid justify-items-center gap-3.5 max-[900px]:-order-1">
        <div
          ref={phone}
          className="bg-scoreboard border-scoreboard relative aspect-[9/16] w-[min(320px,82vw)] max-w-full overflow-hidden rounded-[38px] border-[10px] shadow-[0_40px_70px_-35px_rgba(10,31,46,.55),0_0_0_1px_var(--border)]"
        >
          <span aria-hidden className="bg-scoreboard absolute top-2 left-1/2 z-[2] h-[18px] w-[70px] -translate-x-1/2 rounded-xl" />
          <video
            ref={video}
            src={`${base}lesson.mp4`}
            poster={`${base}lesson-poster.jpg`}
            playsInline
            preload="metadata"
            controls={started}
            onPlay={() => setStarted(true)}
            onTimeUpdate={(e) => {
              const t = e.currentTarget.currentTime
              let k = 0
              chapters.forEach((c, i) => { if (t >= c.t - 0.2) k = i })
              setCur(k)
            }}
            aria-label="Пример урока: смэш, вибора и бандеха"
            className="bg-scoreboard block size-full object-cover"
          />
          {!started && (
            <button
              type="button"
              onClick={() => startAt()}
              aria-label="Смотреть урок"
              className="group absolute inset-0 z-[1] grid cursor-pointer place-items-center bg-[linear-gradient(180deg,transparent_55%,rgba(7,21,33,.55))]"
            >
              <span className="bg-accent grid size-[76px] place-items-center rounded-full shadow-[0_12px_30px_-8px_rgba(0,0,0,.5)] transition-transform group-hover:scale-[1.08]">
                <Play className="text-accent-foreground ml-1 size-7 fill-current" />
              </span>
              <small className="absolute inset-x-0 bottom-5 text-center font-mono text-xs tracking-[0.08em] text-white">СМОТРЕТЬ УРОК · 1:53</small>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
