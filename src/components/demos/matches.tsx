import { Badge } from "@/components/ui/badge"

const items = [
  { d: "СБ", t: "19:00", title: "Ищем пару на тренировку защиты", meta: "2 игрока · уровень 2.5–3.0 · 1,8 км", tag: "Подходит", fit: true },
  { d: "ВС", t: "11:30", title: "Американо для новичков", meta: "8 игроков · клуб-партнёр", tag: "Подходит", fit: true },
  { d: "14", t: "НОЯ", title: "Турнир для новичков", meta: "Готовность по маршруту: 4 из 6 шагов", tag: "Подать заявку", fit: false },
]

export function Matches() {
  return (
    <div className="grid gap-2.5">
      {items.map((m) => (
        <div key={m.title} className="bg-background grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3.5 rounded-xl border p-3.5">
          <div className="text-muted-foreground text-center font-mono text-[12.5px] leading-tight">
            {m.d}
            <b className="text-foreground block text-lg">{m.t}</b>
          </div>
          <div className="min-w-0">
            <b className="block text-[15px]">{m.title}</b>
            <span className="text-muted-foreground text-[13.5px]">{m.meta}</span>
          </div>
          <Badge variant={m.fit ? "accent" : "secondary"} className="rounded-lg px-2 py-1 font-mono text-xs font-normal">{m.tag}</Badge>
        </div>
      ))}
    </div>
  )
}
