import type { ReactNode } from "react"
import { CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { SectionHead } from "@/components/section-head"
import { cn } from "@/lib/utils"

const sides: { who: string; icon: ReactNode; items: string[] }[] = [
  {
    who: "Игрок",
    icon: (<><circle cx="20" cy="20" r="19" fill="var(--accent)" /><path d="M8 14c6 3 18 3 24 0M8 26c6-3 18-3 24 0" stroke="rgba(0,0,0,.25)" strokeWidth="2" fill="none" /></>),
    items: ["Доступ к знаниям без оплаты каждого часа тренера", "Программу с понятным следующим шагом", "Помощь в выборе тренера по цели, стилю, цене и месту", "Счёт, правила и разбор видео между уроками"],
  },
  {
    who: "Тренер",
    icon: (<><ellipse cx="17" cy="15" rx="11" ry="13" fill="none" stroke="var(--brand)" strokeWidth="3" /><path d="M23 25l10 10" stroke="var(--brand)" strokeWidth="4" strokeLinecap="round" /><circle cx="14" cy="12" r="1.6" fill="var(--brand)" /><circle cx="20" cy="12" r="1.6" fill="var(--brand)" /><circle cx="17" cy="18" r="1.6" fill="var(--brand)" /></>),
    items: ["Продажу авторской методики многим ученикам", "Поток подготовленных учеников на очные занятия", "Учеников, которые приходят с историей обучения и задачей", "Публичную репутацию на подтверждённых отзывах"],
  },
  {
    who: "Клуб и организатор",
    icon: (<><rect x="3" y="9" width="34" height="22" rx="2" fill="none" stroke="var(--foreground)" strokeWidth="2.5" /><path d="M20 9v22M9 9v22M31 9v22" stroke="var(--foreground)" strokeWidth="1.5" /></>),
    items: ["Канал привлечения игроков, которые бронируют корты", "Участников турниров, готовых к формату", "Аудиторию для совместных программ", "Бронирование корта даёт клубу 68% выручки, игроки ему нужны постоянно"],
  },
]

export function Marketplace() {
  return (
    <section className="section bg-card border-y">
      <div className="wrap">
        <SectionHead eyebrow="Маркетплейс" title="Три стороны рынка, и каждая получает свою выгоду">
          Тренеры проходят отбор по понятным критериям. Рейтинг строится только на подтверждённых занятиях и покупках, с модерацией и правом ответа.
        </SectionHead>
        <div className="grid gap-4 min-[901px]:grid-cols-3">
          {sides.map((s) => (
            <Card key={s.who} className="rv min-w-0 content-start gap-4 rounded-[14px] p-[clamp(22px,3vw,32px)] shadow-none">
              <div className="flex items-center gap-3">
                <svg width="40" height="40" viewBox="0 0 40 40" className="flex-none" aria-hidden>{s.icon}</svg>
                <div>
                  <div className="text-brand font-mono text-[11.5px] tracking-[0.1em] uppercase">получает</div>
                  <h3 className="text-[21px] font-semibold">{s.who}</h3>
                </div>
              </div>
              <ul className="grid gap-2.5">
                {s.items.map((it) => <li key={it} className="border-t pt-2.5 text-[15.5px]">{it}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const tiers = [
  { k: "Вход", title: "Бесплатно", text: "Вводный курс и базовые материалы по правилам. Задача: привести игрока и показать ценность.", w: 100, ball: true },
  { k: "Ядро", title: "Платный контент", text: "Программы следующих уровней, подписка на персональные функции, пакеты видеоразборов, обратная связь тренера.", w: 72 },
  { k: "Маркетплейс", title: "Комиссия", text: "С продажи курсов тренеров и с очных занятий, оформленных через платформу.", w: 50 },
  { k: "Далее", title: "Партнёрства", text: "Предложения клубов и турниров для подготовленной аудитории.", w: 30 },
]

export function Monetization() {
  return (
    <section id="money" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Монетизация" title="Бесплатный вход, платный рост, комиссия с офлайна">
          Обучение и очные занятия дополняют друг друга: практика рождает новый запрос на развитие, и игрок возвращается за следующим этапом.
        </SectionHead>
        <Card className="rv grid gap-0 overflow-hidden rounded-[14px] py-0 shadow-none sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <div
              key={t.k}
              className={cn(
                "grid min-w-0 content-start gap-3 px-[22px] py-[26px]",
                i < 3 && "max-sm:border-b",
                i % 2 === 0 && "sm:border-r",
                i < 2 && "sm:max-lg:border-b",
                i === 1 && "lg:border-r",
                i === 2 && "lg:border-r"
              )}
            >
              <span className="text-muted-foreground font-mono text-[11.5px] tracking-[0.1em] uppercase">{t.k}</span>
              <h3 className="text-xl font-semibold">{t.title}</h3>
              <p className="text-muted-foreground text-[15px]">{t.text}</p>
              <div className="bg-muted h-1.5 overflow-hidden rounded-sm">
                <span className={cn("block h-full rounded-sm", t.ball ? "bg-accent" : "bg-brand")} style={{ width: `${t.w}%` }} />
              </div>
            </div>
          ))}
        </Card>
        <p className="text-muted-foreground mt-[18px] max-w-[70ch] text-[14.5px]">
          Полосы показывают путь игрока по воронке, а не долю выручки. Тарифы и распределение выручки с тренерами определяем после проверки спроса и затрат в пилоте.
        </p>
      </div>
    </section>
  )
}

export function Market() {
  return (
    <section id="market" className="section bg-card border-y">
      <div className="wrap">
        <SectionHead eyebrow="Почему сейчас" title="Корты строятся быстрее, чем появляются хорошие тренеры">
          Инфраструктура в России растёт кратно. Каждый новый корт приводит новичков, которым нужна программа обучения.
        </SectionHead>
        <div className="rv grid gap-4 min-[901px]:grid-cols-3">
          {[
            ["6,2 млрд ₽", "ожидаемый оборот рынка падела в России в 2025 году"],
            ["30–36 мес.", "окупаемость клуба при средней рентабельности 35%: клубы будут открываться дальше"],
            ["225", "турниров в год проводит ФПР: спрос на подготовку к соревнованиям уже есть"],
          ].map(([v, t]) => (
            <div key={v} className="grid content-start gap-2 border-t py-6">
              <b className="font-display text-[clamp(30px,3.6vw,44px)] font-semibold tracking-[-0.02em] tabular-nums">{v}</b>
              <span className="text-muted-foreground text-[15px]">{t}</span>
            </div>
          ))}
        </div>
        <Card className="rv mt-[30px] gap-0 rounded-[14px] px-2 py-3.5 shadow-none sm:p-[22px]">
          <svg
            viewBox="0 0 640 232"
            className="block h-auto w-full font-mono text-[11px] max-sm:text-[21px]"
            role="img"
            aria-label="Число падел-кортов в России: 2021 около 9, октябрь 2025 — 568, прогноз 2030 — 2135"
          >
            <line x1={60} y1={190} x2={620} y2={190} stroke="var(--border)" />
            {[140, 90, 40].map((y) => <line key={y} x1={60} y1={y} x2={620} y2={y} stroke="var(--border)" strokeDasharray="3 5" />)}
            <g className="max-sm:hidden" fill="var(--muted-foreground)" textAnchor="end">
              <text x={50} y={194}>0</text><text x={50} y={144}>700</text><text x={50} y={94}>1 400</text><text x={50} y={44}>2 100</text>
            </g>
            <path d="M90 189.4 L330 149.4" stroke="var(--brand)" strokeWidth={3} fill="none" />
            <path d="M330 149.4 L600 37.5" stroke="var(--brand)" strokeWidth={3} fill="none" strokeDasharray="6 6" />
            <path d="M90 189.4 L330 149.4 L330 190 L90 190Z" fill="var(--brand)" opacity={0.14} />
            <circle cx={90} cy={189.4} r={5} fill="var(--brand)" />
            <circle cx={330} cy={149.4} r={7} fill="var(--accent)" stroke="var(--card)" strokeWidth={2} />
            <circle cx={600} cy={37.5} r={5} fill="var(--card)" stroke="var(--brand)" strokeWidth={2.5} />
            <g fill="var(--muted-foreground)">
              <text x={70} y={218}>2021</text>
              <text x={330} y={218} textAnchor="middle">окт. 2025</text>
              <text x={625} y={218} textAnchor="end">2030, прогноз</text>
            </g>
            <text x={96} y={176} fill="var(--foreground)">≈9</text>
            <text x={330} y={133} textAnchor="middle" fill="var(--foreground)" fontWeight={600} className="text-[13px] max-sm:text-[21px]">568 кортов</text>
            <text x={592} y={26} textAnchor="end" fill="var(--foreground)" fontWeight={600} className="text-[13px] max-sm:text-[21px]">2 135</text>
          </svg>
        </Card>
        <p className="text-muted-foreground mt-[18px] max-w-[70ch] text-[14.5px]">
          Падел-корты в России. 2021 год рассчитан из роста «в 60 раз» к 568. Источник: «Ведомости. Спорт», декабрь 2025.
        </p>
      </div>
    </section>
  )
}

const phases = [
  { k: "ФАЗА 1 · ПИЛОТ", title: "Первая версия", now: true, items: ["Один сильный тренер-соавтор методики", "Бесплатный вводный этап и один платный курс", "Профиль прогресса и материалы по правилам", "Запись на очное занятие", "Параллельно: прототип счёта с кнопками на реальных играх"] },
  { k: "ФАЗА 2 · МАРКЕТПЛЕЙС", title: "Сеть тренеров", items: ["Новые тренеры и их курсы", "Отбор, сертификация и рейтинги", "Турниры от партнёров", "Подбор партнёров по уровню"] },
  { k: "ФАЗА 3 · ИИ", title: "Персональный тренер в кармане", items: ["Полноценный цифровой аватар тренера", "Автоматический видеоанализ", "Только после проверки качества ответов и рекомендаций на экспертных разборах"] },
]
const metrics = ["Доля игроков, завершивших вводный курс", "Конверсия в оплату следующего этапа", "Повторное использование приложения: счёт, правила, разборы", "Запись к тренеру после онлайн-обучения"]

export function Launch() {
  return (
    <section id="launch" className="section">
      <div className="wrap">
        <SectionHead eyebrow="План запуска" title="Сначала проверяем, что люди учатся и платят. Потом масштабируем">
          Тяжёлые ИИ-функции развиваем только после проверки качества. Первая версия держится на одном сильном тренере и простом пути до очного занятия.
        </SectionHead>
        <div className="grid gap-4 min-[901px]:grid-cols-3">
          {phases.map((p) => (
            <div key={p.k} className={cn("rv grid min-w-0 content-start gap-3 border-t-[3px] pt-5", p.now && "border-t-accent")}>
              <span className="text-muted-foreground font-mono text-xs tracking-[0.08em]">{p.k}</span>
              <h3 className="text-[21px] font-semibold">{p.title}</h3>
              <ul className="text-muted-foreground grid list-disc gap-1.5 pl-[18px] text-[15.5px]">
                {p.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <Card className="rv mt-[clamp(36px,5vw,56px)] grid gap-6 rounded-[14px] p-[clamp(22px,3vw,32px)] shadow-none md:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <div className="eyebrow">Метрики пилота</div>
            <h3 className="mt-2.5 text-[19px] font-semibold">Что докажет, что модель работает</h3>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {metrics.map((m) => (
              <div key={m} className="grid grid-cols-[28px_minmax(0,1fr)] gap-2.5 text-[15.5px]">
                <CheckCircle2 className="fill-accent text-accent-foreground mt-0.5 size-6" aria-hidden />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

export function Final() {
  return (
    <section className="section bg-court relative overflow-hidden text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg,transparent calc(50% - 1px),rgba(255,255,255,.5) calc(50% - 1px),rgba(255,255,255,.5) calc(50% + 1px),transparent calc(50% + 1px)),linear-gradient(90deg,transparent 15%,rgba(255,255,255,.22) 15%,rgba(255,255,255,.22) calc(15% + 2px),transparent calc(15% + 2px),transparent 85%,rgba(255,255,255,.22) 85%,rgba(255,255,255,.22) calc(85% + 2px),transparent calc(85% + 2px))",
        }}
      />
      <div className="wrap relative grid max-w-[900px] gap-[22px]">
        <div className="eyebrow text-[#F1C823]">Присоединяйтесь</div>
        <h2 className="text-[clamp(30px,4.6vw,56px)] leading-[1.05] font-bold">Падел растёт. Мы строим то, как в него будут учиться</h2>
        <p className="max-w-[60ch] text-[clamp(17px,1.7vw,20px)] text-white/85">Ищем партнёров, которые помогут запустить пилот и проверить модель на реальных игроках.</p>
        <div className="mt-2 grid gap-3 md:grid-cols-3">
          {[
            ["Инвесторы", "Финансирование первой версии и пилота"],
            ["Тренеры", "Соавторы методики и первых курсов"],
            ["Клубы", "Площадки для пилота, турниров и очных занятий"],
          ].map(([b, s]) => (
            <div key={b} className="grid gap-1.5 rounded-[14px] border border-white/20 bg-[rgba(7,21,33,.35)] p-[18px]">
              <b className="text-base">{b}</b>
              <span className="text-[14.5px] text-white/80">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="text-muted-foreground py-9 text-[13px]">
      <div className="wrap grid gap-2.5">
        <span className="font-mono">Bandeja — рабочее название. Бандеха — фирменный удар падела над головой.</span>
        <span>Источники цифр:</span>
        <ol className="grid list-decimal gap-1 pl-[18px]">
          <li>
            <a className="underline" href="https://www.padeladdict.com/en/padel-is-experiencing-unstoppable-growth-more-than-58000-courts-worldwide-and-19-4-million-players/" target="_blank" rel="noopener">
              Playtomic × Strategy&amp; (PwC), Global Padel Report 2026 — обзор Padel Addict
            </a>
          </li>
          <li>
            <a className="underline" href="https://www.vedomosti.ru/sport/others/articles/2025/12/05/1160982-kak-padel-stal-samim-bistrorastuschim-vidom-sporta-v-rossii" target="_blank" rel="noopener">
              «Ведомости. Спорт»: как падел стал самым быстрорастущим видом спорта в России, 05.12.2025
            </a>
          </li>
        </ol>
      </div>
    </footer>
  )
}
