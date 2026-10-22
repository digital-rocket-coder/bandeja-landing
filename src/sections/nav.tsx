import { BallDot } from "@/components/section-head"

const links = [
  ["#idea", "Идея"],
  ["#problem", "Проблема"],
  ["#path", "Путь игрока"],
  ["#product", "Продукт"],
  ["#market", "Рынок"],
  ["#launch", "Запуск"],
] as const

export function Nav() {
  return (
    <>
      <div aria-hidden className="bg-background fixed inset-x-0 top-0 z-[60]" style={{ height: "env(safe-area-inset-top, 0px)" }} />
      <header
        className="bg-background/80 sticky z-50 border-b backdrop-blur-md"
        style={{ top: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="wrap flex h-[62px] items-center gap-6">
          <a href="#top" className="font-display flex items-center gap-2.5 text-lg font-bold tracking-tight no-underline">
            <BallDot />
            Bandeja
          </a>
          <nav className="ml-auto hidden md:block" aria-label="Разделы">
            <ul className="text-muted-foreground flex gap-[22px] text-[14.5px]">
              {links.map(([href, label]) => (
                <li key={href}>
                  <a className="hover:text-foreground no-underline" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
