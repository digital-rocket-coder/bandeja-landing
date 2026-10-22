import { useState } from "react"
import { Undo2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type State = { p: [number, number]; g: [number, number]; sets: [number, number][]; won: [number, number]; tb: boolean; done: 0 | 1 | null }
const fresh = (): State => ({ p: [0, 0], g: [0, 0], sets: [], won: [0, 0], tb: false, done: null })
const PT = ["0", "15", "30", "40"]
const sample: State = { ...fresh(), p: [3, 3], g: [3, 2] }
const teams = ["Синие", "Жёлтые"]

function label(st: State, i: 0 | 1) {
  const p = st.p[i], q = st.p[1 - i]
  if (st.tb) return String(p)
  if (p >= 3 && q >= 3) return p === q ? "40" : p > q ? "AD" : "40"
  return PT[Math.min(p, 3)]
}

function addPoint(prev: State, i: 0 | 1, golden: boolean): State {
  if (prev.done !== null) return fresh()
  const st: State = structuredClone(prev)
  const o = (1 - i) as 0 | 1
  st.p[i]++
  const p = st.p[i], q = st.p[o]
  const winGame = () => {
    st.g[i]++; st.p = [0, 0]; st.tb = false
    if ((st.g[i] >= 6 && st.g[i] - st.g[o] >= 2) || st.g[i] === 7) {
      st.sets.push([...st.g] as [number, number]); st.won[i]++; st.g = [0, 0]
      if (st.won[i] === 2) st.done = i
    } else if (st.g[0] === 6 && st.g[1] === 6) st.tb = true
  }
  if (st.tb) { if (p >= 7 && p - q >= 2) winGame() }
  else if (golden && p === 4 && q === 3) winGame()
  else if (p >= 4 && p - q >= 2) winGame()
  return st
}

export function Scoreboard() {
  const [st, setSt] = useState<State>(sample)
  const [hist, setHist] = useState<State[]>([])
  const [golden, setGolden] = useState(false)
  const [bump, setBump] = useState<0 | 1 | null>(null)

  const add = (i: 0 | 1) => {
    setHist((h) => (st.done !== null ? [] : [...h.slice(-199), st]))
    setSt(addPoint(st, i, golden))
    setBump(i); setTimeout(() => setBump(null), 160)
  }

  let status: string
  if (st.done !== null) status = `Матч выигран: ${teams[st.done]} · нажмите любую кнопку для нового`
  else if (st.tb) status = `Сет ${st.sets.length + 1} · тай-брейк до 7`
  else {
    const even = st.p[0] >= 3 && st.p[1] >= 3 && st.p[0] === st.p[1]
    status = `Сет ${st.sets.length + 1} · гейм ${st.g[0] + st.g[1] + 1}${even ? (golden ? " · золотое очко: следующий розыгрыш решает гейм" : " · ровно") : ""}`
  }
  const row = "grid grid-cols-[minmax(0,1fr)_repeat(3,26px)_50px] items-center gap-1 px-0.5 py-2.5 sm:grid-cols-[minmax(0,1fr)_repeat(3,44px)_64px] sm:gap-1.5 sm:px-1.5"

  return (
    <>
      <div className="bg-scoreboard rounded-2xl px-2.5 py-3 font-mono text-[#F2F6F9] sm:p-[18px]" aria-live="polite">
        <div className={cn(row, "py-1 text-[10.5px] tracking-[0.12em] text-[rgba(242,246,249,.55)]")}>
          <span className="max-sm:invisible">КОМАНДА</span>
          {["С1", "С2", "С3"].map((s) => <span key={s} className="text-center">{s}</span>)}
          <span className="text-center">ОЧКИ</span>
        </div>
        {([0, 1] as const).map((i) => {
          const lead = st.done !== null ? st.done === i : st.p[i] > st.p[1 - i]
          const si = st.sets.length
          return (
            <div key={i} className={cn(row, "border-b border-white/[.08] last:border-b-0")}>
              <span className="flex min-w-0 items-center gap-2 overflow-hidden font-sans text-[15px] font-semibold whitespace-nowrap">
                <em className={cn("size-2 shrink-0 rounded-full bg-[#F1C823]", !lead && "opacity-0")} />
                {teams[i]}
              </span>
              {[0, 1, 2].map((j) => (
                <span key={j} className={cn("text-center text-[15px] tabular-nums sm:text-[17px]", j === si && st.done === null ? "text-white" : "text-[rgba(242,246,249,.6)]")}>
                  {j < si ? st.sets[j][i] : j === si && st.done === null ? st.g[i] : "–"}
                </span>
              ))}
              <span className={cn("rounded-lg bg-[#F1C823] py-1 text-center text-xl font-semibold text-[#1A1600] tabular-nums transition-transform sm:text-2xl", bump === i && "scale-[1.15]")}>
                {st.done !== null ? (st.done === i ? "🏆" : "") : label(st, i)}
              </span>
            </div>
          )
        })}
        <div className="min-h-7 px-1.5 pt-2.5 text-xs text-[rgba(242,246,249,.65)]">{status}</div>
      </div>
      <div className="mt-3.5 grid grid-cols-2 gap-2.5">
        {([0, 1] as const).map((i) => (
          <Button key={i} variant="outline" className="h-auto rounded-xl border-[1.5px] py-3.5 text-[15px] font-semibold active:scale-[.97]" onClick={() => add(i)}>
            <span className="bg-accent size-5 rounded-full shadow-[inset_-3px_-3px_0_rgba(0,0,0,.12)]" />
            Очко {i ? "жёлтым" : "синим"}
          </Button>
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-2.5">
        <Button variant="outline" className="h-auto flex-1 rounded-xl border-[1.5px] px-3.5 py-2.5 text-[13.5px]" onClick={() => { const last = hist.at(-1); if (last) { setSt(last); setHist(hist.slice(0, -1)) } }}>
          <Undo2 /> Отменить
        </Button>
        <Button
          variant={golden ? "default" : "outline"}
          aria-pressed={golden}
          className="h-auto flex-1 rounded-xl border-[1.5px] px-3.5 py-2.5 text-[13.5px]"
          onClick={() => setGolden(!golden)}
        >
          Золотое очко
        </Button>
        <Button variant="outline" className="h-auto flex-1 rounded-xl border-[1.5px] px-3.5 py-2.5 text-[13.5px]" onClick={() => { setSt(fresh()); setHist([]) }}>
          Новый матч
        </Button>
      </div>
    </>
  )
}
