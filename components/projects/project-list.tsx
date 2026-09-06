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
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";
import { getLanguageStyle } from "@/lib/project-utils";

type ProjectListProps = {
  projects: Project[];
  locale: Locale;
  messages: Messages;
};

type FilterCategory = "all" | "community" | "org";

export function ProjectList({
  projects,
  locale,
  messages: msgs,
}: ProjectListProps) {
  const [filter, setFilter] = useState<FilterCategory>("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  const countAll = projects.length;
  const countCommunity = projects.filter(
    (p) => p.category === "community",
  ).length;
  const countOrg = projects.filter((p) => p.category === "org").length;

  return (
    <div className="mt-8">
      {/* Cyberpunk Filter Controls */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "neon-btn-3d text-cyan inline-flex items-center justify-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-xs tracking-widest uppercase transition-all duration-300 select-none",
            filter === "all"
              ? "border-cyan bg-cyan/20 text-cyan-bright font-bold shadow-[0_0_15px_rgba(0,240,255,0.35)]"
              : "border-cyan/30 text-cyan-dim hover:border-cyan hover:text-cyan",
          )}
        >
          {msgs["projects.category.all"]} ({countAll})
        </button>
        <button
          onClick={() => setFilter("community")}
          className={cn(
            "neon-btn-3d text-cyan inline-flex items-center justify-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-xs tracking-widest uppercase transition-all duration-300 select-none",
            filter === "community"
              ? "border-cyan bg-cyan/20 text-cyan-bright font-bold shadow-[0_0_18px_rgba(0,240,255,0.4)]"
              : "border-cyan/30 text-cyan-dim hover:border-cyan hover:text-cyan",
          )}
        >
          {msgs["projects.category.community"]} ({countCommunity})
        </button>
        <button
          onClick={() => setFilter("org")}
          className={cn(
            "neon-btn-3d text-cyan inline-flex items-center justify-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-xs tracking-widest uppercase transition-all duration-300 select-none",
            filter === "org"
              ? "border-cyan bg-cyan/20 text-cyan-bright font-bold shadow-[0_0_18px_rgba(0,240,255,0.4)]"
              : "border-cyan/30 text-cyan-dim hover:border-cyan hover:text-cyan",
          )}
        >
          {msgs["projects.category.org"]} ({countOrg})
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-5 text-center md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <GlitchCard
            key={project.name}
            className="cyber-hud-box bg-void-surface/70 border-cyan/15 hover:border-cyan/40 flex h-full flex-col items-center rounded-sm border p-6 text-center backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.25)]"
          >
            {/* Header: Title with fixed min-height for horizontal alignment */}
            <div className="mb-1 w-full">
              <h3 className="font-display text-cyan group-hover:text-cyan-bright flex min-h-[3.25rem] items-center justify-center text-center text-xl font-bold tracking-wide transition-colors">
                {project.name}
              </h3>
            </div>

            {/* Authors attribution with fixed height */}
            <div className="text-cyan-dim/80 mb-3 flex h-6 w-full items-center justify-center gap-1.5 text-center font-mono text-[11px]">
              {project.authors && project.authors.length > 0 && (
                <>
                  <IconUser
                    size={12}
                    className="text-cyan-deep flex-shrink-0"
                  />
                  <span className="text-cyan-deep select-none">
                    {msgs["projects.by"]}:
                  </span>
                  {project.authors.map((author, idx) => (
                    <a
                      key={author.github}
                      href={`https://github.com/${author.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-dim hover:text-cyan decoration-cyan/30 hover:decoration-cyan underline transition-colors"
                    >
                      @{author.github}
                      {idx < (project.authors?.length ?? 0) - 1 ? "," : ""}
                    </a>
                  ))}
                </>
              )}
            </div>

            {/* Body: Description with flexible vertical center space */}
            <div className="mb-5 flex min-h-[4.5rem] w-full flex-1 items-center justify-center">
              <p className="text-cyan-dim/90 text-center font-sans text-xs leading-relaxed sm:text-sm">
                {locale === "es" ? project.description : project.descriptionEn}
              </p>
            </div>

            {/* Footer: Technology Tag & Action Buttons horizontally aligned */}
            <div className="border-cyan/10 mt-auto flex h-11 w-full items-center justify-between border-t pt-3.5">
              {/* Tech / Language Badge with Unique Technology Colors */}
              <span
                className={cn(
                  "flex flex-shrink-0 items-center gap-1.5 rounded-xs border px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase",
                  getLanguageStyle(project.language),
                )}
              >
                <IconCode size={12} />
                {project.language}
              </span>

              {/* Actions: Code + Demo Standardized Buttons */}
              <div className="flex items-center gap-2">
                <NeonButton
                  href={project.repoUrl}
                  external
                  size="sm"
                  icon={<IconBrandGithub size={13} className="text-cyan" />}
                >
                  {msgs["projects.repo"]}
                </NeonButton>
                {project.homepageUrl && (
                  <NeonButton
                    href={project.homepageUrl}
                    external
                    size="sm"
                    icon={<IconWorld size={13} className="text-cyan" />}
                  >
                    {msgs["projects.demo"]}
                  </NeonButton>
                )}
              </div>
            </div>
          </GlitchCard>
        ))}
      </div>
    </div>
  );
}
