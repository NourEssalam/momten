import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CiShare1 } from 'react-icons/ci'

export default function ShareMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex gap-2">
        <span className="flex gap-2 items-center underline cursor-pointer">
          Share :
          <CiShare1 className=" text-black font-bold stroke-[0.5] w-5 text-xl cursor-pointer" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuLabel>Share To Social Media</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Facebook </DropdownMenuItem>
          <DropdownMenuItem>Twitter</DropdownMenuItem>
          <DropdownMenuItem>Instagram </DropdownMenuItem>
          <DropdownMenuItem>LinkedIn</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* */
