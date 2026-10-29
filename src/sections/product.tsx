import type { ReactNode } from "react"
import { DemoFrame, SectionHead } from "@/components/section-head"
import { LessonVideo } from "@/components/demos/lesson-video"
import { RulesChat } from "@/components/demos/rules-chat"
import { Scoreboard } from "@/components/demos/scoreboard"
import { CoachAvatar } from "@/components/demos/coach-avatar"
import { VideoReview } from "@/components/demos/video-review"
import { SkillRadar } from "@/components/demos/skill-radar"
import { Matches } from "@/components/demos/matches"
import { cn } from "@/lib/utils"

function Feature({
  eyebrow, title, text, points, demo, label, flip, extra,
}: {
  eyebrow: string; title: string; text: string; points: string[]; demo: ReactNode; label: string; flip?: boolean; extra?: ReactNode
}) {
  return (
    <div className="grid items-center gap-[clamp(28px,5vw,72px)] border-t py-[clamp(36px,5vw,64px)] min-[901px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className={cn("rv grid min-w-0 gap-4", flip && "min-[901px]:order-2")}>
        <div className="eyebrow">{eyebrow}</div>
        <h3 className="text-[clamp(24px,2.8vw,34px)] leading-[1.12] font-semibold">{title}</h3>
        <p className="text-muted-foreground">{text}</p>
        <ul className="dot-list mt-1 grid gap-2.5">
          {points.map((p) => <li key={p}>{p}</li>)}
        </ul>
        {extra}
      </div>
      <DemoFrame label={label}>{demo}</DemoFrame>
    </div>
  )
}

export function Product() {
  return (
    <section id="product" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Продукт" title="Приложение, которое нужно и на уроке, и на корте, и после игры">
          Обучение даёт причину купить. Инструменты для корта дают причину открывать приложение каждую неделю, между уроками.
        </SectionHead>

        <LessonVideo />

        <Feature
          eyebrow="На корте · ИИ-помощник по правилам"
          title="Спорный розыгрыш решается за минуту, а не за полчаса спора"
          text="Игрок описывает ситуацию своими словами. Помощник уточняет детали и объясняет решение со ссылкой на актуальную редакцию официальных правил."
          points={[
            "Если факты неизвестны или описаны по-разному, показывает варианты и называет недостающую деталь",
            "База правил обновляется, ответы проверяет тренерская команда",
            "На турнире решение остаётся за судьёй, помощник это прямо говорит",
          ]}
          label="Демо"
          demo={<RulesChat />}
        />
        <Feature
          flip
          eyebrow="На корте · счёт"
          title="Счёт ведёт приложение. Игрокам остаётся играть"
          text="Очко добавляется кнопкой на футболке или жестом на часах. Счёт виден на телефоне, часах или экране у корта, а история нажатий помогает восстановить его при споре."
          points={[
            "Отдельная кнопка у каждой команды, отмена и защита от двойных нажатий",
            "Форматы: классическое «больше-меньше» и золотое очко",
            "Ввод проверяем в реальной игре, когда в руке ракетка",
          ]}
          extra={
            <div className="grid gap-2">
              <p className="text-[14.5px]">Попробуйте сами: нажимайте кнопки команд в демо.</p>
              <a href={`${import.meta.env.BASE_URL}mount/`} className="text-brand w-fit text-[15px] font-semibold underline-offset-4 hover:underline">
                Как табло крепится на сетку и стекло корта →
              </a>
            </div>
          }
          label="Работает"
          demo={<Scoreboard />}
        />
        <Feature
          eyebrow="Обучение · цифровой аватар тренера"
          title="Методика тренера доступна в любое время, а не только по записи"
          text="С согласия тренера создаём его цифрового аватара. Он объясняет материал, помогает выбрать следующий урок и отвечает в рамках проверенной методики."
          points={[
            "Игрок всегда видит, где ИИ, а где личная обратная связь тренера",
            "Ответы опираются на материалы курса и базу знаний",
            "Если информации не хватает, вопрос уходит живому тренеру",
          ]}
          label="Пример"
          demo={<CoachAvatar />}
        />
        <Feature
          flip
          eyebrow="После игры · видеоразбор"
          title="Каждая ошибка с таймкодом, объяснением и упражнением"
          text="Игрок загружает запись тренировки. Приложение отмечает удачные действия и моменты для работы: подготовку к удару, положение на корте, повторяющиеся ошибки."
          points={[
            "Пара приоритетных задач попадает в персональный план",
            "Новые записи показывают, что изменилось со временем",
            "Где ракурс не позволяет сделать уверенный вывод, приложение так и пишет",
          ]}
          label="Пример"
          demo={<VideoReview />}
        />
        <Feature
          eyebrow="Прогресс · какой ты игрок"
          title="Профиль связывает желаемый стиль игры с конкретными навыками"
          text="Игрок выбирает цель: увереннее защищаться, чаще атаковать у сетки, подготовиться к турниру. Платформа строит программу и уточняет её по упражнениям, играм и оценкам тренеров."
          points={[
            "Учебные баллы и игровой уровень считаются отдельно",
            "У каждой оценки виден источник и дата обновления",
            "Сертификат этапа с явными критериями проверки",
          ]}
          label="Пример"
          demo={<SkillRadar />}
        />
        <Feature
          flip
          eyebrow="Сообщество · партнёры и турниры"
          title="Игры своего уровня и понятный путь к первому турниру"
          text="Платформа подбирает партнёров по уровню, цели встречи, месту и времени. Гайд по первому турниру снимает страх: формат, регламент, подготовка, день выступления."
          points={[
            "Клубы и организаторы размещают турниры для сообщества",
            "Отдельный формат: турнир для новичков с учебным маршрутом",
            "После матча игрок возвращается к обучению с новыми задачами",
          ]}
          label="Пример"
          demo={<Matches />}
        />
      </div>
    </section>
  )
}
