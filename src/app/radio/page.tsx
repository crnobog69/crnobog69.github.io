"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import {
  Radio,
  ArrowLeft,
  Music,
  BookOpen,
  Activity,
  RadioTower,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect } from "react";

interface RadioStation {
  id: string;
  name: string;
  location: string;
  frequency?: string;
  icon: React.ElementType;
  color: string;
}

export default function RadioStationsPage() {
  // List of radio stations
  const radioStations: RadioStation[] = [
    {
      id: "kolubara",
      name: "Радио Колубара",
      location: "Лајковац, Република Србија",
      frequency: "96,9",
      icon: Radio,
      color: "text-red-500",
    },
    {
      id: "km",
      name: "Радио Косовска Митровица",
      location: "Косовска Митровица, Косово и Метохија",
      frequency: "104,6",
      icon: Activity,
      color: "text-purple-500",
    },
    {
      id: "rts",
      name: "РТС 1",
      location: "Београд, Република Србија",
      frequency: "90,9",
      icon: BookOpen,
      color: "text-green-500",
    },
    {
      id: "s",
      name: "Радио С",
      location: "Београд, Република Србија",
      frequency: "94,9",
      icon: Music,
      color: "text-blue-500",
    },
  ];

  // Enhanced scroll prevention with multiple approaches
  useEffect(() => {
    // Apply multiple techniques to prevent scrolling
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.documentElement.style.position = "fixed";
    document.documentElement.style.width = "100%";
    document.documentElement.style.touchAction = "none";
    document.documentElement.style.overscrollBehavior = "none";

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.height = "100%";
    document.body.style.width = "100%";
    document.body.style.touchAction = "none";
    document.body.style.overscrollBehavior = "none";

    // Add event listeners to prevent scroll events
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("wheel", preventDefault, { passive: false });
    document.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      // Restore all defaults when component unmounts
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.documentElement.style.position = "";
      document.documentElement.style.width = "";
      document.documentElement.style.touchAction = "";
      document.documentElement.style.overscrollBehavior = "";

      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.height = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";

      document.removeEventListener("wheel", preventDefault);
      document.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-background text-foreground"
      style={{ touchAction: "none", overscrollBehavior: "none" }}
    >
      <div
        className="flex flex-col h-full"
        style={{ maxHeight: "100vh", overflow: "hidden" }}
      >
        <header className="flex-shrink-0 border-b border-border">
          <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-1 md:gap-2 text-foreground hover:text-muted-foreground transition-colors"
            >
              <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="text-sm md:text-base">Назад на почетну</span>
            </Link>
            <div className="flex items-center gap-1 md:gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </header>

        <main
          id="radio-content"
          className="flex-1 container mx-auto px-4 py-8 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 60px)" }}
        >
          <section className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <div className="text-center space-y-4 md:space-y-6">
              <div className="flex justify-center">
                <RadioTower className="h-16 w-16 md:h-20 md:w-20 text-red-500" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold">Радио станице</h1>
              <p className="text-base md:text-xl text-muted-foreground">
                Слушајте различите радио станице уживо
              </p>
            </div>

            <Separator className="my-6 md:my-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {radioStations.map((station) => (
                <Link href={`/radio/${station.id}`} key={station.id}>
                  <div className="group bg-card hover:bg-muted border border-border rounded-lg p-6 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <station.icon className={`h-10 w-10 ${station.color}`} />
                      {station.frequency && (
                        <span className="text-sm font-medium text-muted-foreground bg-background/50 px-2 py-1 rounded">
                          {station.frequency} MHz
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 grow">
                      <h2 className="text-xl font-semibold group-hover:text-red-500 transition-colors">
                        {station.name}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {station.location}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex justify-end">
                      <span className="text-sm font-medium text-red-500 group-hover:translate-x-1 transition-transform duration-300">
                        Слушај уживо
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
