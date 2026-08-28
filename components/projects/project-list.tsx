"use client";

import { useState } from "react";
import {
  IconCode,
  IconWorld,
  IconBrandGithub,
  IconUser,
} from "@tabler/icons-react";
import { type Project } from "@/data/projects";
import { type Locale } from "@/i18n/config";
import { type Messages } from "@/i18n/messages";
import { GlitchCard } from "@/components/ui/glitch-card";
import { cn } from "@/lib/utils";
import { getLanguageStyle } from "@/lib/project-utils";

type ProjectListProps = {
  projects: Project[];
  locale: Locale;
  messages: Messages;
};

type FilterCategory = "all" | "community" | "org";

export function ProjectList({ projects, locale, messages: msgs }: ProjectListProps) {
  const [filter, setFilter] = useState<FilterCategory>("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  const countAll = projects.length;
  const countCommunity = projects.filter((p) => p.category === "community").length;
  const countOrg = projects.filter((p) => p.category === "org").length;

  return (
    <div className="mt-8">
      {/* Cyberpunk Filter Segment Controls with Category-Specific Glows */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mb-10">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-300 select-none",
            filter === "all"
              ? "bg-cyan/20 border-cyan text-cyan-bright shadow-[0_0_15px_rgba(0,240,255,0.35)] font-bold"
              : "border-cyan/20 text-cyan-dim/70 hover:text-cyan hover:border-cyan/40 bg-void-surface/60"
          )}
        >
          {msgs["projects.category.all"]} ({countAll})
        </button>
        <button
          onClick={() => setFilter("community")}
          className={cn(
            "font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-300 select-none",
            filter === "community"
              ? "bg-cyan/20 border-cyan text-cyan-bright shadow-[0_0_18px_rgba(0,240,255,0.4)] font-bold"
              : "border-cyan/20 text-cyan-dim/70 hover:text-cyan hover:border-cyan/40 bg-void-surface/60"
          )}
        >
          {msgs["projects.category.community"]} ({countCommunity})
        </button>
        <button
          onClick={() => setFilter("org")}
          className={cn(
            "font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-300 select-none",
            filter === "org"
              ? "bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.4)] font-bold"
              : "border-purple-400/20 text-purple-300/70 hover:text-purple-300 hover:border-purple-400/40 bg-void-surface/60"
          )}
        >
          {msgs["projects.category.org"]} ({countOrg})
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 text-center">
        {filteredProjects.map((project) => (
          <GlitchCard
            key={project.name}
            className="cyber-hud-box flex flex-col p-6 rounded-sm bg-void-surface/70 backdrop-blur-sm border border-cyan/15 hover:border-cyan/40 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.25)] transition-all duration-300 text-center items-center h-full"
          >
            {/* Header: Title with fixed min-height for horizontal alignment */}
            <div className="w-full mb-1">
              <h3 className="font-display text-xl font-bold tracking-wide text-cyan group-hover:text-cyan-bright transition-colors min-h-[3.25rem] flex items-center justify-center text-center">
                {project.name}
              </h3>
            </div>

            {/* Authors attribution with fixed height */}
            <div className="w-full h-6 flex items-center justify-center gap-1.5 font-mono text-[11px] text-cyan-dim/80 text-center mb-3">
              {project.authors && project.authors.length > 0 && (
                <>
                  <IconUser size={12} className="text-cyan-deep flex-shrink-0" />
                  <span className="text-cyan-deep select-none">{msgs["projects.by"]}:</span>
                  {project.authors.map((author, idx) => (
                    <a
                      key={author.github}
                      href={`https://github.com/${author.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-dim hover:text-cyan underline decoration-cyan/30 hover:decoration-cyan transition-colors"
                    >
                      @{author.github}
                      {idx < (project.authors?.length ?? 0) - 1 ? "," : ""}
                    </a>
                  ))}
                </>
              )}
            </div>

            {/* Body: Description with flexible vertical center space */}
            <div className="flex-1 w-full flex items-center justify-center mb-5 min-h-[4.5rem]">
              <p className="text-cyan-dim/90 font-sans text-xs sm:text-sm leading-relaxed text-center">
                {locale === "es" ? project.description : project.descriptionEn}
              </p>
            </div>

            {/* Footer: Technology Tag & Action Buttons horizontally aligned */}
            <div className="border-cyan/10 mt-auto flex items-center justify-between w-full border-t pt-3.5 h-11">
              {/* Tech / Language Badge with Unique Technology Colors */}
              <span
                className={cn(
                  "flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-xs border flex-shrink-0",
                  getLanguageStyle(project.language)
                )}
              >
                <IconCode size={12} />
                {project.language}
              </span>

              {/* Actions: Code + Demo */}
              <div className="flex items-center gap-2">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-cyan-dim hover:text-cyan border border-cyan/20 hover:border-cyan/50 px-2.5 py-1 rounded-xs transition-all duration-200 bg-void/50 hover:bg-cyan/10"
                >
                  <IconBrandGithub size={12} />
                  {msgs["projects.repo"]}
                </a>
                {project.homepageUrl && (
                  <a
                    href={project.homepageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-cyan-bright hover:text-cyan border border-cyan/40 hover:border-cyan px-2.5 py-1 rounded-xs transition-all duration-200 bg-cyan/10 hover:bg-cyan/20 shadow-[0_0_8px_rgba(0,240,255,0.15)]"
                  >
                    <IconWorld size={12} />
                    {msgs["projects.demo"]}
                  </a>
                )}
              </div>
            </div>
          </GlitchCard>
        ))}
      </div>
    </div>
  );
}
