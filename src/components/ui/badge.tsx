import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-white",
        outline: "text-foreground",
        accent: "border-transparent bg-accent text-accent-foreground",
        brand: "border-transparent bg-brand text-brand-foreground",
      },
      shape: {
        default: "",
        pill: "rounded-full px-2.5 py-1 font-mono text-[11.5px] font-semibold uppercase tracking-[0.06em]",
        chip: "rounded-full px-3 py-1.5 text-[13px] font-normal",
      },
    },
    defaultVariants: { variant: "default", shape: "default" },
  }
)

function Badge({
  className,
  variant,
  shape,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant, shape }), className)} {...props} />
}

export { Badge, badgeVariants }
