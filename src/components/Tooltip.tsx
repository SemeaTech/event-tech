import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react";

interface ITooltipProps {
  children: ReactNode;
  message: string;
}

export function TooltipHover({ children, message }: ITooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          { children }
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-poppins text-base font-medium text-gray-200">{ message }</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
