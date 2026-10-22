import { useEffect, useState } from "react"
import { useInViewOnce, prefersReducedMotion } from "@/hooks/use-motion"

type Msg = { u?: string; a?: string; verdict?: string; src?: string }
const script: Msg[] = [
  { u: "Соперник пробил, мяч попал прямо в сетку на нашей стороне, не коснувшись пола. Мы не стали отбивать. Чьё очко?" },
  {
    verdict: "Очко ваше",
    a: "После удара соперника мяч должен сначала отскочить от пола на вашей половине. Если он до отскока попал в стекло или металлическую сетку, это ошибка ударившего.",
    src: "Официальные правила FIP, актуальная редакция · видеопример в уроке «Стены и сетка»",
  },
  { u: "А если сначала был отскок от пола, а потом мяч ушёл в сетку?" },
  {
    a: "Тогда мяч в игре, и вы могли его отбить. Не отбили — очко соперника. Если вы с соперниками по-разному помните, был ли отскок, решение зависит от этой детали. На турнире его принимает судья.",
    src: "Официальные правила FIP, актуальная редакция",
  },
]

function Bubble({ m }: { m: Msg }) {
  if (m.u)
    return <div className="bg-brand text-brand-foreground max-w-[88%] justify-self-end rounded-2xl rounded-br-[4px] px-[15px] py-3 text-[15px] leading-[1.45] [animation:pop_.35s_ease_both]">{m.u}</div>
  return (
    <div className="bg-muted max-w-[88%] justify-self-start rounded-2xl rounded-bl-[4px] px-[15px] py-3 text-[15px] leading-[1.45] [animation:pop_.35s_ease_both]">
      {m.verdict && <span className="bg-accent text-accent-foreground mb-1.5 inline-block rounded-md px-2 py-px font-semibold">{m.verdict}</span>}
      {m.verdict && <br />}
      {m.a}
      {m.src && <span className="text-muted-foreground mt-2 block font-mono text-[11.5px]">{m.src}</span>}
    </div>
  )
}

export function RulesChat() {
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0.4)
  const [shown, setShown] = useState(prefersReducedMotion() ? script.length : 2)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!seen || prefersReducedMotion()) return
    let alive = true
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    ;(async () => {
      while (alive) {
        setShown(0)
        for (let i = 0; i < script.length && alive; i++) {
          if (script[i].a) { setTyping(true); await wait(1300); setTyping(false) }
          setShown(i + 1)
          await wait(script[i].u ? 900 : 2600)
        }
        await wait(4000)
      }
    })()
    return () => { alive = false }
  }, [seen])

  return (
    <div ref={ref} className="grid min-h-[330px] content-start gap-3" aria-live="polite">
      {script.slice(0, shown).map((m, i) => <Bubble key={i} m={m} />)}
      {typing && (
        <div className="bg-muted flex gap-[5px] justify-self-start rounded-2xl px-4 py-3.5">
          {[0, 0.15, 0.3].map((d) => <i key={d} className="bg-muted-foreground size-[7px] rounded-full" style={{ animation: `blink 1s ${d}s infinite` }} />)}
        </div>
      )}
    </div>
  )
}
