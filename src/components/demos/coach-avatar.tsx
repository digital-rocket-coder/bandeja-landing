import { ArrowRightCircle } from "lucide-react"

export function CoachAvatar() {
  return (
    <div className="grid gap-3.5">
      <div className="flex items-center gap-3.5">
        <div aria-hidden className="relative size-[58px] flex-none rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--accent),color-mix(in_srgb,var(--accent)_50%,var(--brand)))]">
          <span className="bg-primary text-primary-foreground absolute -right-1 -bottom-1 rounded-md px-[5px] py-0.5 font-mono text-[10px] font-semibold">ИИ</span>
        </div>
        <div>
          <b className="block text-base">Аватар тренера</b>
          <span className="text-muted-foreground text-[13.5px]">Курс «Базовая игра» · урок 6 из 14</span>
        </div>
      </div>
      <div className="bg-brand text-brand-foreground max-w-[88%] justify-self-end rounded-2xl rounded-br-[4px] px-[15px] py-3 text-[15px] leading-[1.45]">
        Почему после бандехи я не успеваю вернуться к сетке?
      </div>
      <div className="bg-muted max-w-[88%] rounded-2xl rounded-bl-[4px] px-[15px] py-3 text-[15px] leading-[1.45]">
        Бандеха нужна, чтобы удержать позицию у сетки. В уроке 6 разбираем: бить чуть раньше, в шаге вперёд, и сразу закрывать центр. Упражнение «бандеха + два шага» добавил в план на неделю.
        <span className="text-muted-foreground mt-2 block font-mono text-[11.5px]">Источник: урок 6, фрагмент 02:14</span>
      </div>
      <div className="border-brand flex items-center gap-2.5 rounded-xl border-[1.5px] border-dashed px-3.5 py-3 text-sm">
        <ArrowRightCircle className="text-brand size-[22px] flex-none" aria-hidden />
        <span>Вопрос про боль в локте передан тренеру. Ответ придёт лично от него.</span>
      </div>
    </div>
  )
}
