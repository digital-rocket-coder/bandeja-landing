import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { SectionHead } from "@/components/section-head"

const problems: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Высокий порог стоимости",
    text: "Регулярные тренировки и аренда корта делают системное развитие дорогим. Платить приходится за время, а не за прогресс.",
    icon: (<><rect x="4" y="12" width="36" height="22" rx="5" fill="none" stroke="var(--brand)" strokeWidth="2.5" /><circle cx="22" cy="23" r="5" fill="var(--accent)" /></>),
  },
  {
    title: "Тренера не с чем сравнить",
    text: "Нет понятных критериев квалификации и подхода. Высокая цена занятия сама по себе не объясняет его ценность.",
    icon: (<><circle cx="16" cy="18" r="7" fill="none" stroke="var(--brand)" strokeWidth="2.5" /><circle cx="30" cy="18" r="7" fill="none" stroke="var(--brand)" strokeWidth="2.5" /><path d="M8 36c2-6 14-6 16 0M22 36c2-6 14-6 16 0" stroke="var(--brand)" strokeWidth="2.5" fill="none" /><text x="20" y="22" fontSize="11" fontWeight="700" fill="var(--accent)">?</text></>),
  },
  {
    title: "Нет программы и обратной связи",
    text: "Разовые тренировки, советы знакомых и ролики не складываются в план: что учить сейчас, какие ошибки исправлять, как мерить прогресс.",
    icon: (<><path d="M6 34l8-10 6 6 8-12 10 14" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeDasharray="3 4" strokeLinecap="round" /><circle cx="38" cy="34" r="4" fill="var(--accent)" /></>),
  },
  {
    title: "Хаос на корте",
    text: "Путаница в счёте, споры о правилах, сложно найти партнёров своего уровня и понять, когда ты готов к первому турниру.",
    icon: (<><rect x="5" y="9" width="34" height="26" rx="3" fill="none" stroke="var(--brand)" strokeWidth="2.5" /><path d="M22 9v26" stroke="var(--brand)" strokeWidth="2.5" /><text x="9" y="27" fontSize="11" fontFamily="monospace" fontWeight="700" fill="var(--foreground)">15</text><text x="25" y="27" fontSize="11" fontFamily="monospace" fontWeight="700" fill="var(--foreground)">30?</text></>),
  },
]

export function Problem() {
  return (
    <section id="problem" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Проблема" title="Попробовать падел легко. Расти в нём системно — дорого и непонятно">
          Новичок за вечер влюбляется в игру, а дальше упирается в четыре стены. Как на корте, только выхода через дверь нет.
        </SectionHead>
        <Card className="rv bg-border grid gap-px overflow-hidden rounded-[14px] py-0 shadow-none md:grid-cols-2">
          {problems.map((p) => (
            <div key={p.title} className="bg-card grid min-w-0 content-start gap-3 p-[clamp(22px,3vw,34px)]">
              <svg className="size-11" viewBox="0 0 44 44" aria-hidden>{p.icon}</svg>
              <h3 className="text-xl leading-tight font-semibold">{p.title}</h3>
              <p className="text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </Card>
        <div className="rv text-muted-foreground mt-7 flex flex-wrap items-baseline gap-x-7 gap-y-3.5 text-[15px]">
          <span><b className="font-display text-foreground text-[28px] font-semibold">61%</b> россиян готовы сыграть в падел, если рядом будет инфраструктура</span>
          <span><b className="font-display text-foreground text-[28px] font-semibold">26%</b> уже слышали об игре</span>
          <span className="font-mono text-xs">ВЦИОМ, по данным «Ведомостей», 2025</span>
        </div>
      </div>
    </section>
  )
}
