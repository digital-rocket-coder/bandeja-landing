import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SectionHead({
  eyebrow,
  title,
  children,
  className,
  invert,
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  className?: string
  invert?: boolean
}) {
  return (
    <div className={cn("rv mb-8 grid max-w-[780px] gap-4 md:mb-14", className)}>
      <div className={cn("eyebrow", invert && "text-accent")}>{eyebrow}</div>
      <h2 className="text-[clamp(28px,4.2vw,48px)] leading-[1.08] font-semibold">{title}</h2>
      {children && <p className="text-muted-foreground max-w-[62ch] text-[clamp(17px,1.6vw,19px)]">{children}</p>}
    </div>
  )
}

export function DemoFrame({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("rv bg-card relative min-w-0 rounded-[20px] border px-3 py-4 sm:p-[clamp(16px,2.4vw,26px)]", className)}>
      <span className="bg-background text-muted-foreground absolute -top-[11px] right-[18px] rounded-full border px-2.5 py-[3px] font-mono text-[10.5px] tracking-[0.1em] uppercase">
        {label}
      </span>
      {children}
    </div>
  )
}

export function BallDot({ className }: { className?: string }) {
  return (
    <i
      aria-hidden
      className={cn("bg-accent block size-[18px] rounded-full shadow-[inset_-3px_-3px_0_rgba(0,0,0,.12)]", className)}
    />
  )
}
