"use client";

import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/language-toggle";
import {
  FolderGit2,
  PenLine,
  Mail,
  Github,
  PaintBucket,
  MountainSnow,
  ExternalLink,
  Search,
  HomeIcon,
  Gitlab,
  MessagesSquare,
  Send,
  Music2,
  Coffee,
  Twitter,
  Hash,
  Users,
  Cloud,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import projectsData from "@/data/projects.json";
import contactData from "@/data/contact.json";
import articles from "@/data/articles.json";
import { ArticleCard } from "@/components/ArticleCard";

const socialIcons = {
  GitHub: Github,
  BitBucket: PaintBucket,
  Codeberg: MountainSnow,
  GitLab: Gitlab,
  Gitea: Coffee,
  Discord: MessagesSquare,
  Telegram: Send,
  "Last.fm": Music2,
  "Ko-fi": Coffee,
  X: Twitter,
  Matrix: Hash,
  Mastodon: Users,
  Bluesky: Cloud,
  "Stats-FM": BarChart3,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "home" | "projects" | "writing" | "contact"
  >("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTabChanging, setIsTabChanging] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".project-card").forEach((card) => {
      observerRef.current?.observe(card);
    });
    return () => observerRef.current?.disconnect();
  }, [activeTab, searchQuery]);

  const handleTabChange = (
    tab: "home" | "projects" | "writing" | "contact"
  ) => {
    setIsTabChanging(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTabChanging(false);
    }, 150);
  };

  const filteredProjects = projectsData.projects.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative overflow-x-hidden">
      <div className="relative z-10">
        <main className="container mx-auto px-4 py-16">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold">{t.title}</h1>
            <p className="text-muted-foreground">{t.role}</p>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                <i>{t.quote}</i>
              </p>
            </div>
          </section>
          <Separator className="my-8" />
          <nav className="overflow-x-auto -mx-4 px-4 mb-8">
            <div className="flex items-center gap-4 min-w-max h-9">
              <button
                onClick={() => handleTabChange("home")}
                className={`font-medium inline-flex items-center gap-2 shrink-0 ${
                  activeTab === "home"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <HomeIcon size={18} />
                {t.nav.home}
              </button>
              <Separator orientation="vertical" className="h-4 shrink-0" />
              <button
                onClick={() => handleTabChange("projects")}
                className={`font-medium inline-flex items-center gap-2 shrink-0 ${
                  activeTab === "projects"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <FolderGit2 size={18} />
                {t.nav.projects}
              </button>
              <Separator orientation="vertical" className="h-4 shrink-0" />
              <button
                onClick={() => handleTabChange("writing")}
                className={`font-medium inline-flex items-center gap-2 shrink-0 ${
                  activeTab === "writing"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <PenLine size={18} />
                {t.nav.writing}
              </button>
              <Separator orientation="vertical" className="h-4 shrink-0" />
              <button
                onClick={() => handleTabChange("contact")}
                className={`font-medium inline-flex items-center gap-2 shrink-0 ${
                  activeTab === "contact"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Mail size={18} />
                {t.nav.contact}
              </button>
              <Separator orientation="vertical" className="h-4 shrink-0" />
              <div className="shrink-0 flex gap-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </nav>
          <div
            className={`transition-opacity duration-300 ${isTabChanging ? "opacity-0" : "opacity-100"}`}
          >
            {activeTab === "home" && (
              <div className="space-y-12 max-w-2xl">
                <section className="space-y-4">
                  <h2 className="text-4xl font-bold gradient-text fade-in-up">
                    {t.role}
                  </h2>
                </section>
                <section className="space-y-6 fade-in-up delayed-more">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-border bg-muted/50 hover-lift">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        {t.home.currentFocus}
                      </h3>
                      <p className="text-sm">{t.home.currentFocusText}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-muted/50 hover-lift">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        {t.home.technologies}
                      </h3>
                      <p className="text-sm">{t.home.technologiesText}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-muted/50 hover-lift">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        {t.home.interests}
                      </h3>
                      <p className="text-sm">{t.home.interestsText}</p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-muted/50 hover-lift">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        {t.home.location}
                      </h3>
                      <p className="text-sm">{t.home.locationText}</p>
                    </div>
                  </div>
                </section>

                <section className="pt-8 fade-in-up delayed-more">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="default"
                      className="hover-lift"
                      onClick={() => handleTabChange("projects")}
                    >
                      <FolderGit2 className="mr-2 h-5 w-5" />
                      {t.nav.projects}
                    </Button>

                    <Button
                      variant="outline"
                      size="default"
                      className="hover-lift"
                      onClick={() => handleTabChange("contact")}
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      {t.nav.contact}
                    </Button>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t.search.projects}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-0 bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  {filteredProjects.map((project, index) => (
                    <article
                      key={index}
                      className="group project-card"
                      style={{
                        transitionDelay: `${Math.min(index * 30, 300)}ms`,
                      }}
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block space-y-2 p-4 rounded-lg border border-border bg-muted/50 hover:bg-muted/80 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium group-hover:text-red-500">
                            {project.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-muted-foreground">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </a>
                    </article>
                  ))}
                  {filteredProjects.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      {t.search.noResults} &ldquo;{searchQuery}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "writing" && (
              <div className="space-y-8">
                {articles.articles.map(
                  (
                    article: {
                      id: number;
                      title: string;
                      excerpt: string;
                      url: string;
                      date: string;
                      tags?: string[];
                    },
                    index: number
                  ) => (
                    <ArticleCard
                      key={index}
                      article={article}
                      isLast={index === articles.articles.length - 1}
                    />
                  )
                )}
              </div>
            )}

            {activeTab === "contact" && (
              <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Code section */}
                <section className="space-y-4">
                  <h3 className="text-base font-medium flex items-center gap-2 text-muted-foreground">
                    <FolderGit2 className="h-4.5 w-4.5" />
                    {t.contact.code}
                  </h3>
                  <div className="space-y-2">
                    {contactData.contact.social_links
                      .filter((link) =>
                        [
                          "GitHub",
                          "BitBucket",
                          "GitLab",
                          "Codeberg",
                          "Gitea",
                        ].includes(link.name)
                      )
                      .map((link, index) => {
                        const IconComponent =
                          socialIcons[link.name as keyof typeof socialIcons];
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between py-2.5 px-4 rounded-md border border-border bg-muted hover:bg-muted/80 transition-colors group"
                          >
                            <span className="flex items-center gap-2.5">
                              {IconComponent && (
                                <IconComponent className="h-4.5 w-4.5" />
                              )}
                              <span className="text-[13px]">{link.name}</span>
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        );
                      })}
                  </div>
                </section>

                {/* Social section */}
                <section className="space-y-4">
                  <h3 className="text-base font-medium flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4.5 w-4.5" />
                    {t.contact.social}
                  </h3>
                  <div className="space-y-2">
                    {contactData.contact.social_links
                      .filter((link) =>
                        [
                          "Mastodon",
                          "X",
                          "Bluesky",
                          "Discord",
                          "Ko-fi",
                        ].includes(link.name)
                      )
                      .map((link, index) => {
                        const IconComponent =
                          socialIcons[link.name as keyof typeof socialIcons];
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between py-2.5 px-4 rounded-md border border-border bg-muted hover:bg-muted/80 transition-colors group"
                          >
                            <span className="flex items-center gap-2.5">
                              {IconComponent && (
                                <IconComponent className="h-4.5 w-4.5" />
                              )}
                              <span className="text-[13px]">{link.name}</span>
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        );
                      })}
                  </div>
                </section>

                {/* Communication section */}
                <section className="space-y-4">
                  <h3 className="text-base font-medium flex items-center gap-2 text-muted-foreground">
                    <MessagesSquare className="h-4.5 w-4.5" />
                    {t.contact.communication}
                  </h3>
                  <div className="space-y-2">
                    {contactData.contact.social_links
                      .filter((link) =>
                        ["Matrix", "Telegram"].includes(link.name)
                      )
                      .map((link, index) => {
                        const IconComponent =
                          socialIcons[link.name as keyof typeof socialIcons];
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between py-2.5 px-4 rounded-md border border-border bg-muted/50 hover:bg-muted/80 transition-colors group"
                          >
                            <span className="flex items-center gap-2.5">
                              {IconComponent && (
                                <IconComponent className="h-4.5 w-4.5" />
                              )}
                              <span className="text-[13px]">{link.name}</span>
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        );
                      })}
                  </div>
                </section>

                {/* Other section */}
                <section className="space-y-4">
                  <h3 className="text-base font-medium flex items-center gap-2 text-muted-foreground">
                    <Music2 className="h-4.5 w-4.5" />
                    {t.contact.other}
                  </h3>
                  <div className="space-y-2">
                    {contactData.contact.social_links
                      .filter((link) =>
                        ["Last.fm", "Stats-FM"].includes(link.name)
                      )
                      .map((link, index) => {
                        const IconComponent =
                          socialIcons[link.name as keyof typeof socialIcons];
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between py-2.5 px-4 rounded-md border border-border bg-muted hover:bg-muted/80 transition-colors group"
                          >
                            <span className="flex items-center gap-2.5">
                              {IconComponent && (
                                <IconComponent className="h-4.5 w-4.5" />
                              )}
                              <span className="text-[13px]">{link.name}</span>
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        );
                      })}
                  </div>
                </section>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
