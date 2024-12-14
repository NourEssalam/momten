import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiShare1 } from "react-icons/ci";

export default function ShareMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex gap-2">
        <span>
          Share :
          <CiShare1 className=" text-black font-bold stroke-1 w-7 h-7 text-xl cursor-pointer" />
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
  );
}

/* */
