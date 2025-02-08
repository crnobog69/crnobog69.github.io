"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";
import { languageNames } from "@/contexts/LanguageContext";

type LanguageCode = "sr" | "en";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const code = event.currentTarget.getAttribute("data-code") as LanguageCode;
    setLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languageNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={handleClick}
            data-code={code}
            className={language === code ? "bg-muted" : ""}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
