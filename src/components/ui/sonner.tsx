"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-grayDark group-[.toaster]:text-white group-[.toaster]:font-jetbrains group-[.toaster]:border-gray-950 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-400 group-[.toast]:font-poppins",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-grayDark group-[.toast]:font-medium group-[.toast]:font-poppins",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
