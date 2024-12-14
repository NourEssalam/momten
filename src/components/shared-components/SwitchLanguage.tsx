"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaGlobeAmericas } from "react-icons/fa";

export default function SwitchLanguage() {
  const [position, setPosition] = React.useState("top");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="sm">
          <FaGlobeAmericas className="text-grey w-6 h-6  cursor-pointer hover:text-accent" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-10">
        <DropdownMenuLabel>Choose Your language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Arabic</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">French</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
