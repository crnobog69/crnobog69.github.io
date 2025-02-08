"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandGroup,
  CommandList,
} from "@/components/ui/command";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";
import { languageNames } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { setLanguage } = useLanguage();

  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 border-0 shadow-none p-2">
        <Command className="border-0 p-0">
          <CommandInput placeholder="Select language..." />
          <CommandList>
            <CommandGroup>
              {Object.entries(languageNames).map(([code, name]) => (
                <CommandItem
                  key={code}
                  value={code}
                  data-text-value={normalize(name)}
                  onSelect={(value: string) => setLanguage(value as Language)}
                >
                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
