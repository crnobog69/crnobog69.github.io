"use client";

import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import {
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Music,
  ArrowLeft,
  Loader2,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function RadioSPage() {
  const [volume, setVolume] = useState<number>(80);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hlsSupported, setHlsSupported] = useState<boolean | null>(null);
  
  // Radio S HLS stream URL
  const streamUrl = "https://5bc45691ca49f.streamlock.net/asmedia/radios/playlist.m3u8";
  // Fallback direct MP3 stream if HLS fails
  const fallbackStreamUrl = "https://53be5ef2d659e.streamlock.net/asmedia/radios/playlist.mp3";
  
  const [currentStreamUrl, setCurrentStreamUrl] = useState(streamUrl);
  const hlsRef = useRef<any>(null);

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

  // Initialize HLS.js when component mounts - MODIFIED APPROACH
  useEffect(() => {
    if (!isClient) return;

    let isMounted = true;
    
    const initializeHls = async () => {
      try {
        // Dynamically import hls.js
        const HlsModule = await import('hls.js');
        const Hls = HlsModule.default;
        
        if (!isMounted) return;

        // Check if HLS is supported
        if (Hls.isSupported()) {
          setHlsSupported(true);
          
          if (hlsRef.current) {
            hlsRef.current.destroy();
          }
          
          const hls = new Hls({
            debug: false,
            enableWorker: true,
          });
          
          if (!audioRef.current) return;
          
          hls.attachMedia(audioRef.current);
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(currentStreamUrl);
          });
          
          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              console.error("HLS.js fatal error:", data.type, data.details);
              
              if (currentStreamUrl === streamUrl) {
                // Try fallback URL
                setCurrentStreamUrl(fallbackStreamUrl);
                setErrorMessage("Покушавам алтернативни извор...");
              } else {
                setErrorMessage("Нисмо успели да повежемо стрим. Молимо проверите интернет конекцију.");
              }
              
              hls.destroy();
            }
          });
          
          hlsRef.current = hls;
        } else if (audioRef.current && audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          // For browsers that support HLS natively (like Safari)
          setHlsSupported(false);
          audioRef.current.src = currentStreamUrl;
        } else {
          // Fallback for browsers without HLS support
          setHlsSupported(false);
          setCurrentStreamUrl(fallbackStreamUrl);
          if (audioRef.current) {
            audioRef.current.src = fallbackStreamUrl;
          }
        }
      } catch (error) {
        console.error('Failed to load HLS.js:', error);
        setHlsSupported(false);
        
        // Use fallback stream URL
        setCurrentStreamUrl(fallbackStreamUrl);
        if (audioRef.current) {
          audioRef.current.src = fallbackStreamUrl;
        }
      }
    };
    
    initializeHls();
    
    return () => {
      isMounted = false;
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [isClient]);

  // Update source when currentStreamUrl changes but only if not using HLS.js
  useEffect(() => {
    if (!isClient || hlsSupported === null) return;
    
    // If we're not using HLS.js, update the src attribute directly
    if (hlsSupported === false && audioRef.current) {
      audioRef.current.src = currentStreamUrl;
    }
  }, [currentStreamUrl, isClient, hlsSupported]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setIsLoading(true);
      setErrorMessage(null);

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      
      loadingTimeoutRef.current = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
          setErrorMessage("Учитавање стрима је истекло. Покушајте поново.");
        }
      }, 15000); // 15 second timeout
      
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
    
    // Only set error message if we're using the fallback URL already
    if (currentStreamUrl === fallbackStreamUrl) {
      setErrorMessage("Нисмо успели да успоставимо конекцију са радио станицом. Молимо проверите вашу интернет конекцију или покушајте касније.");
    } else {
      // Switch to fallback URL
      setCurrentStreamUrl(fallbackStreamUrl);
      setErrorMessage("Покушавам алтернативни извор...");
    }
    
    console.error("Audio stream error occurred");
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
                <Music className="h-16 w-16 md:h-20 md:w-20 text-blue-500" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold">Радио С</h1>
              <p className="text-base md:text-xl text-muted-foreground">
                94,9: Београд, Република Србија
              </p>
            </div>

            <Separator className="my-8 md:my-12" />

            {/* Player UI */}
            <div className="bg-card border border-border rounded-lg md:rounded-xl p-6 md:p-10 shadow-md relative overflow-hidden">
              {/* Audio wave visualization */}
              {isPlaying && (
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 h-28 md:h-40 flex items-end justify-around">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 md:w-1.5 bg-blue-500 rounded-t-full audio-bar"
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
                {/* Error message display with retry button */}
                {errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3 text-sm text-center">
                    <p className="text-red-500 mb-2">{errorMessage}</p>
                    {/* Only show retry button when appropriate */}
                    {errorMessage.includes("Молимо проверите") && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-1 text-xs border-red-500/30 text-red-500 hover:bg-red-500/10"
                        onClick={() => {
                          setErrorMessage(null);
                          setIsLoading(true);
                          // Try the main URL first
                          setCurrentStreamUrl(streamUrl);
                          setTimeout(() => {
                            if (audioRef.current) {
                              audioRef.current.load();
                              audioRef.current.play().catch(() => {
                                setIsLoading(false);
                                setErrorMessage("И даље не можемо да успоставимо конекцију. Покушајте касније.");
                              });
                            }
                          }, 1000);
                        }}
                      >
                        Покушај поново
                      </Button>
                    )}
                  </div>
                )}

                {/* Play button */}
                <div className="flex items-center justify-center gap-4 mt-2 md:mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-14 w-14 md:h-16 md:w-16 rounded-full shadow-sm transition-all ${
                      isPlaying
                        ? "border-blue-500 shadow-blue-500/10 bg-blue-500/5"
                        : ""
                    }`}
                    onClick={handlePlayPause}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-7 w-7 md:h-8 md:w-8 animate-spin" />
                    ) : isPlaying ? (
                      <Pause
                        className={`h-7 w-7 md:h-8 md:w-8 ${isPlaying ? "text-blue-500" : ""}`}
                      />
                    ) : (
                      <Play className="h-7 w-7 md:h-8 md:w-8" />
                    )}
                  </Button>
                </div>

                {/* Volume slider */}
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
                        className="absolute h-full bg-blue-500"
                        style={{ width: `${((volume - 0) / (100 - 0)) * 100}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={volume}
                      onChange={(e) => handleVolumeChange([parseInt(e.target.value, 10)])}
                      className="absolute w-full h-6 opacity-0 cursor-pointer"
                    />
                    <div
                      className="absolute block h-5 w-5 rounded-full border border-border bg-background shadow-sm pointer-events-none"
                      style={{ left: `calc(${((volume - 0) / (100 - 0)) * 100}% - 10px)` }}
                    />
                  </div>
                </div>

                {/* Audio element - has src attribute for fallback, HLS.js will override if supported */}
                <audio
                  ref={audioRef}
                  src={hlsSupported ? undefined : currentStreamUrl}
                  onCanPlay={handleCanPlay}
                  onError={handleError}
                  onPlay={handlePlay}
                  onPause={handlePause}
                />

                {/* Info section */}
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
                      <p>Стрим се емитује директно са сервера Радио С.</p>
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

      {/* CSS animations */}
      <style jsx global>{`
        .audio-bar {
          animation: audio-wave 0.4s ease-in-out infinite alternate;
          transform-origin: bottom;
          box-shadow: 0 0 5px rgba(59, 130, 246, 0.4);
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