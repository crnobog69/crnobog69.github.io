"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Calendar } from "lucide-react";

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    excerpt: string;
    url: string;
    date: string;
    tags?: string[];
  };
  isLast?: boolean;
}

export function ArticleCard({ article, isLast }: ArticleCardProps) {
  return (
    <>
      <article className="group">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block space-y-3 p-4 -mx-4 rounded-lg border border-border bg-muted/50 hover:bg-muted transition-colors"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-medium group-hover:text-red-500 transition-colors">
              {article.title}
            </h3>
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1.5" />
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <time dateTime={article.date}>{article.date}</time>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {article.excerpt}
          </p>

          {/* Tags */}
          {article.tags && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </a>
      </article>
      {!isLast && <Separator className="my-6" />}
    </>
  );
}
