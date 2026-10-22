const formula = [
  ["Игроку", "Понятная программа, обратная связь и помощь прямо на корте"],
  ["Тренеру", "Продажа авторских курсов, репутация и поток учеников на очные занятия"],
  ["Клубу", "Игроки, которые бронируют корты, и участники турниров"],
] as const

const cycle = [
  ["Учится онлайн", "Бесплатный старт, затем платный курс"],
  ["Идёт к тренеру", "Тренер видит историю обучения и задачи"],
  ["Играет и соревнуется", "Партнёры, клубы, турниры"],
  ["Получает новую цель", "Разбор и следующий этап программы"],
] as const

function Flywheel() {
  const pill = (x: number, y: number, w: number, t: string, s: string) => (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-w / 2} y={-26} width={w} height={52} rx={26} fill="#0D2131" stroke="rgba(255,255,255,.2)" />
      <text y={-3} fill="#fff" fontWeight={600} fontSize={15}>{t}</text>
      <text y={15} fill="rgba(255,255,255,.6)" fontSize={11.5}>{s}</text>
    </g>
  )
  return (
    <svg
      viewBox="0 0 520 520"
      className="rv mx-auto hidden w-full max-w-[520px] [font-family:var(--font-sans)] sm:block"
      role="img"
      aria-label="Маховик: игрок учится онлайн, идёт к тренеру, играет и соревнуется, получает новую цель и возвращается к обучению"
    >
      <defs>
        <marker id="ar" viewBox="0 0 10 10" refX={6} refY={5} markerWidth={7} markerHeight={7} orient="auto">
          <path d="M0 0L10 5L0 10z" fill="#F1C823" />
        </marker>
      </defs>
      <circle cx={260} cy={260} r={170} fill="none" stroke="rgba(241,200,35,.25)" strokeWidth={2} strokeDasharray="4 8" />
      <path id="orbit" d="M260 90 A170 170 0 1 1 259.9 90" fill="none" />
      <g fill="none" stroke="#F1C823" strokeWidth={2.5} markerEnd="url(#ar)">
        <path d="M318 100 A170 170 0 0 1 418 196" />
        <path d="M428 318 A170 170 0 0 1 340 412" />
        <path d="M200 420 A170 170 0 0 1 100 324" />
        <path d="M94 204 A170 170 0 0 1 196 100" />
      </g>
      <circle r={10} fill="#F1C823">
        <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
          <mpath href="#orbit" />
        </animateMotion>
      </circle>
      <g textAnchor="middle">
        {pill(260, 72, 184, "Учится онлайн", "бесплатный старт → курс")}
        {pill(448, 260, 140, "Идёт к тренеру", "с историей обучения")}
        {pill(260, 448, 192, "Играет и соревнуется", "партнёры, клубы, турниры")}
        {pill(72, 260, 132, "Новая цель", "разбор и план")}
        <text x={260} y={250} fill="#fff" fontFamily="Unbounded, sans-serif" fontWeight={700} fontSize={26}>Bandeja</text>
        <text x={260} y={276} fill="rgba(255,255,255,.6)" fontSize={13}>каждый круг — новый платный шаг</text>
      </g>
    </svg>
  )
}

export function Idea() {
  return (
    <section id="idea" className="section bg-deep text-[#EAF1F6]">
      <div className="wrap">
        <div className="grid items-center gap-[clamp(32px,5vw,72px)] min-[921px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="rv min-w-0">
            <div className="eyebrow text-accent">Идея за 30 секунд</div>
            <p className="font-display mt-5 text-[clamp(22px,2.6vw,32px)] leading-[1.28] font-medium">
              Интерес к паделу растёт быстрее, чем доступ к хорошему обучению. Мы{" "}
              <mark className="text-accent bg-transparent">превращаем методику сильных тренеров в цифровой продукт</mark>: игрок учится
              системно и дешевле, тренер продаёт свой подход сотням учеников, клубы получают подготовленных игроков.
            </p>
            <dl className="mt-8 grid">
              {formula.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[100px_minmax(0,1fr)] gap-4 border-t border-white/15 py-3.5 text-base sm:grid-cols-[120px_minmax(0,1fr)]">
                  <dt className="text-accent pt-[3px] font-mono text-xs tracking-[0.1em] uppercase">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0">
            <Flywheel />
            <ol className="grid sm:hidden" aria-label="Как игрок движется по платформе">
              {cycle.map(([t, s], i) => (
                <li key={t} className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-3.5 py-3.5">
                  <span aria-hidden className="bg-accent mx-[7px] mt-0.5 size-[22px] rounded-full shadow-[inset_-3px_-3px_0_rgba(0,0,0,.15)]" />
                  {i > 0 && <span aria-hidden className="absolute -top-2.5 left-[17px] h-[22px] border-l-2 border-dashed border-[rgba(241,200,35,.5)]" />}
                  <div>
                    <b className="block text-[17px]">{t}</b>
                    <span className="text-[14.5px] text-[rgba(234,241,246,.7)]">{s}</span>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-accent mt-1.5 pl-[50px] font-mono text-xs tracking-[0.06em] sm:hidden">
              ↻ И снова за обучением. Каждый круг — новый платный шаг
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
