"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import {
  ArrowLeft,
  RadioTower,
  Key,
  Lock,
  Eye,
  EyeOff,
  ExternalLink,
  Atom
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Secret sections data
const secretSections = [
  {
    id: "radio",
    name: "Радио станице",
    description: "Колекција радио станица.",
    icon: RadioTower,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    link: "/radio"
  },
  {
    id: "vrtloznica",
    name: "Вртложница",
    description: "Највећи вртлог икада.",
    icon: Atom, 
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    link: "/vrtloznica"
  },
  {
    id: "crna",
    name: "Црна",
    description: "Црна позадина.",
    icon: Lock,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10", 
    borderColor: "border-purple-500/20",
    link: "/crna"
  }
];

export default function VitorPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  
  const encodedPassword = "dmVybWlsaW9u";
  
  const checkPassword = () => {
    try {
      const decodedPassword = atob(encodedPassword);
      if (password === decodedPassword) {
        setAuthorized(true);
        // Save authorization to localStorage - expires in 1 day
        localStorage.setItem("vitor-auth", Date.now().toString());
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Грешка при дешифровању лозинке:", err);
      setError(true);
    }
  };
  
  // Test if password decoding works
  const testPasswordDecoding = () => {
    try {
      const decodedPassword = atob(encodedPassword);
      alert(`Лозинка је: ${decodedPassword}`);
    } catch (err) {
      alert(`Грешка при дешифровању лозинке: ${err}`);
    }
  };

  // Lock the page again (log out)
  const handleLock = () => {
    localStorage.removeItem("vitor-auth");
    setAuthorized(false);
    setPassword("");
  };

  // Check for stored auth on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("vitor-auth");
    if (storedAuth) {
      const authTime = parseInt(storedAuth);
      const dayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - authTime < dayInMs) {
        setAuthorized(true);
      } else {
        localStorage.removeItem("vitor-auth");
      }
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <header className="border-b border-border">
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

      <main className="container mx-auto px-4 py-12 md:py-20">
        <section className="max-w-4xl mx-auto space-y-6 md:space-y-10">
          <div className="text-center space-y-4 md:space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="h-16 w-16 md:h-20 md:w-20 bg-foreground/5 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 md:h-10 md:w-10 text-foreground/70" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">Витор</h1>
            <p className="text-base md:text-xl text-muted-foreground">
              Приступ заштићеном садржају
            </p>
          </div>

          <Separator className="my-8 md:my-12" />

          {!authorized ? (
            <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-auto text-center">
              <Lock className="h-10 w-10 mx-auto mb-4 text-foreground/70" />
              <h2 className="text-xl font-medium mb-4">Потребна ауторизација</h2>
              <p className="text-muted-foreground mb-6">
                Унесите лозинку да бисте приступили заштићеном садржају.
              </p>
              
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type={isVisible ? "text" : "password"}
                    className="w-full p-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    placeholder="Лозинка..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        checkPassword();
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                
                {error && (
                  <p className="text-red-500 text-sm">
                    Неисправна лозинка, покушајте поново.
                  </p>
                )}
                
                <Button
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                  onClick={checkPassword}
                >
                  Приступи
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Локације</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleLock}
                    className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Закључај
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={testPasswordDecoding}
                    className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Лозинка
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {secretSections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <Link href={section.link} key={section.id}>
                      <div className={`p-6 rounded-lg border ${section.borderColor} ${section.bgColor} group transition-all hover:translate-y-[-2px] duration-300`}>
                        <div className="flex items-start justify-between">
                          <IconComponent className={`h-10 w-10 ${section.color}`} />
                          <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                        </div>
                        <h3 className="text-lg font-medium mt-4 mb-2 group-hover:text-red-500 transition-colors">
                          {section.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
