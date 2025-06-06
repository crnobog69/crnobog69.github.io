"use client";

import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Activity, // Changed from Radio to Activity
  ArrowLeft,
  Loader2,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function KosovskaPage() {
  // Start with a consistent initial state
  const [volume, setVolume] = useState<number>(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stream URL with fallback
  const streamUrl = "https://streaming10.orion.rs:8002/stream";
  const fallbackStreamUrl = "https://streaming10.orion.rs:8002/stream.mp3"; // Fallback URL
  const [currentStreamUrl, setCurrentStreamUrl] = useState(streamUrl);

  // Mark component as hydrated
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load saved volume from localStorage after hydration
  useEffect(() => {
    if (!isClient) return;

    try {
      const savedVolume = localStorage.getItem("radio-volume");
      if (savedVolume) {
        setVolume(parseInt(savedVolume, 10));
      }
    } catch (error) {
      console.error("Error loading volume from localStorage:", error);
    }
  }, [isClient]);

  // Update audio volume when volume state changes
  useEffect(() => {
    if (!isClient) return;

    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }

    // Save volume to localStorage whenever it changes
    try {
      localStorage.setItem("radio-volume", volume.toString());
    } catch (error) {
      console.error("Error saving volume to localStorage:", error);
    }
  }, [volume, isClient]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Clean up any timeouts on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      // Let the onPause event handler update the state
    } else {
      setIsLoading(true);
      setErrorMessage(null);

      // Set a timeout to stop the loading state if it takes too long
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      loadingTimeoutRef.current = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
          setErrorMessage("Учитавање стрима је истекло. Покушајте поново.");
        }
      }, 10000); // 10 second timeout

      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsLoading(false);
        setErrorMessage("Грешка при покретању аудио стрима. Покушајте поново.");
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
      });
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(false);
    setErrorMessage(null);
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsPlaying(false);

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }

    // Switch to fallback URL if not already using it
    if (currentStreamUrl === streamUrl) {
      setCurrentStreamUrl(fallbackStreamUrl);
      setErrorMessage("Покушавам алтернативни извор...");

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play().catch(() => {
            setIsLoading(false);
            setErrorMessage(
              "Нисмо успели да успоставимо конекцију са радио станицом. Молимо проверите вашу интернет конекцију или покушајте касније."
            );
          });
        }
      }, 1000);
    } else {
      setErrorMessage(
        "Нисмо успели да успоставимо конекцију са радио станицом. Молимо проверите вашу интернет конекцију или покушајте касније."
      );
      console.error("Audio stream error occurred with fallback URL");
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-x-hidden">
      <div className="relative z-10">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
            <Link
              href="/radio"
              className="flex items-center gap-1 md:gap-2 text-foreground hover:text-muted-foreground transition-colors"
            >
              <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="text-sm md:text-base">Назад на станице</span>
            </Link>
            <div className="flex items-center gap-1 md:gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-20">
          <section className="max-w-4xl mx-auto space-y-6 md:space-y-10">
            <div className="text-center space-y-4 md:space-y-6">
              <div className="flex justify-center">
                <Activity className="h-16 w-16 md:h-20 md:w-20 text-purple-500" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold">
                Радио Косовска Митровица
              </h1>
              <p className="text-base md:text-xl text-muted-foreground">
                104,6: Косовска Митровица, Косово и Метохија
              </p>
            </div>

            <Separator className="my-8 md:my-12" />

            <div className="bg-card border border-border rounded-lg md:rounded-xl p-6 md:p-10 shadow-md relative overflow-hidden">
              {/* Audio wave visualization background when playing */}
              {isPlaying && (
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 h-28 md:h-40 flex items-end justify-around">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 md:w-1.5 bg-purple-500 rounded-t-full audio-bar"
                        style={{
                          height: "5%",
                          animationDuration: `${0.3 + (i % 4) * 0.1}s`,
                          animationDelay: `${(i % 5) * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6 md:space-y-8 relative z-10">
                {/* Display error message if there is one */}
                {errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3 text-sm text-center text-red-500">
                    {errorMessage}
                  </div>
                )}

                <div className="flex items-center justify-center gap-4 mt-2 md:mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-14 w-14 md:h-16 md:w-16 rounded-full shadow-sm transition-all ${
                      isPlaying
                        ? "border-purple-500 shadow-purple-500/10 bg-purple-500/5"
                        : ""
                    }`}
                    onClick={handlePlayPause}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-7 w-7 md:h-8 md:w-8 animate-spin" />
                    ) : isPlaying ? (
                      <Pause
                        className={`h-7 w-7 md:h-8 md:w-8 ${isPlaying ? "text-purple-500" : ""}`}
                      />
                    ) : (
                      <Play className="h-7 w-7 md:h-8 md:w-8" />
                    )}
                  </Button>
                </div>

                {/* Volume slider with custom purple color */}
                <div className="flex items-center gap-3 md:gap-6 max-w-xl mx-auto pt-4 md:pt-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-10 w-10 md:h-12 md:w-12 transition-colors ${isMuted || volume === 0 ? "text-muted-foreground" : ""}`}
                    onClick={toggleMute}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-5 w-5 md:h-6 md:w-6" />
                    ) : (
                      <Volume2 className="h-5 w-5 md:h-6 md:w-6" />
                    )}
                  </Button>
                  <div className="relative flex w-full touch-none select-none items-center flex-1 h-6">
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="absolute h-full bg-purple-500"
                        style={{
                          width: `${((volume - 0) / (100 - 0)) * 100}%`,
                        }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={volume}
                      onChange={(e) =>
                        handleVolumeChange([parseInt(e.target.value, 10)])
                      }
                      className="absolute w-full h-6 opacity-0 cursor-pointer"
                    />
                    <div
                      className="absolute block h-5 w-5 rounded-full border border-border bg-background shadow-sm pointer-events-none"
                      style={{
                        left: `calc(${((volume - 0) / (100 - 0)) * 100}% - 10px)`,
                      }}
                    />
                  </div>
                </div>

                <audio
                  ref={audioRef}
                  src={currentStreamUrl}
                  onCanPlay={handleCanPlay}
                  onError={handleError}
                  onPlay={handlePlay}
                  onPause={handlePause}
                />

                {/* Collapsible info section */}
                <div className="mt-6 md:mt-8">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between text-muted-foreground text-sm"
                    onClick={() => setInfoOpen(!infoOpen)}
                  >
                    <span className="flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      <span>Информације о стриму</span>
                    </span>
                    {infoOpen ? (
                      <ChevronUp className="h-4 w-4 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                    )}
                  </Button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      infoOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="text-center text-sm md:text-base text-muted-foreground mt-4 pt-4 border-t border-border">
                      <p>
                        Стрим се емитује директно са сервера Радио Косовска
                        Митровица.
                      </p>
                      <p className="mt-2">
                        У случају проблема, освежите страницу или проверите вашу
                        интернет конекцију.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Clean, minimalist animations */}
      <style jsx global>{`
        .audio-bar {
          animation: audio-wave 0.4s ease-in-out infinite alternate;
          transform-origin: bottom;
          box-shadow: 0 0 5px rgba(168, 85, 247, 0.4);
        }

        @keyframes audio-wave {
          0% {
            height: 5%;
          }
          100% {
            height: 55%;
          }
        }

        /* Mobile optimization */
        @media (max-width: 640px) {
          .audio-bar {
            animation-duration: 0.35s;
          }

          @keyframes audio-wave {
            0% {
              height: 5%;
            }
            100% {
              height: 70%;
            }
          }
        }
      `}</style>
    </div>
  );
}
