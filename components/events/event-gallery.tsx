"use client";

import Image from "next/image";
import { IconSparkles } from "@tabler/icons-react";
import { type Event } from "@/data/events";
import { type Locale } from "@/i18n/config";
import { type Messages } from "@/i18n/messages";
import { GlitchCard } from "@/components/ui/glitch-card";
import { cn } from "@/lib/utils";

type EventGalleryProps = {
  events: Event[];
  locale: Locale;
  messages: Messages;
};

export function EventGallery({ events, locale, messages: msgs }: EventGalleryProps) {
  const pastEvents = events.filter((e) => e.status === "past");

  if (pastEvents.length === 0) return null;

  return (
    <section className="mt-16 w-full text-center">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="text-cyan flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase mb-1">
          <IconSparkles size={14} className="text-cyan" />
          {msgs["events.gallery"]}
        </div>
        <h2 className="text-cyan font-display text-2xl sm:text-3xl font-bold tracking-wide">
          {msgs["events.pastEvents"]}
        </h2>
      </div>

      <div
        className={cn(
          "grid gap-6 sm:gap-8 w-full",
          pastEvents.length === 1
            ? "grid-cols-1 max-w-3xl mx-auto"
            : "grid-cols-1 md:grid-cols-2"
        )}
      >
        {pastEvents.map((event) => {
          const detailUrl = `/${locale}/events/${event.id}`;
          return (
            <GlitchCard
              key={event.id}
              href={detailUrl}
              className="cyber-hud-box flex flex-col p-6 sm:p-7 rounded-sm bg-void-surface/70 backdrop-blur-sm border border-cyan/15 hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 text-center items-center cursor-pointer group h-full"
            >
              {/* Event Header: Title with uniform min-height for clean alignment */}
              <div className="flex items-center justify-center w-full mb-3 min-h-[3.25rem]">
                <h3 className="text-cyan group-hover:text-cyan-bright font-display text-xl sm:text-2xl font-bold tracking-wide text-center transition-colors">
                  {locale === "es" ? event.name : event.nameEn}
                </h3>
              </div>

              {/* Flyer Cover Banner */}
              {(event.coverImage || (event.photos && event.photos.length > 0)) && (
                <div className="w-full my-auto mx-auto relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-sm border border-cyan/30 bg-void shadow-[0_0_20px_rgba(0,240,255,0.15)] group-hover:border-cyan/60 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300">
                  <Image
                    src={event.coverImage || event.photos![0].url}
                    alt={event.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                </div>
              )}
            </GlitchCard>
          );
        })}
      </div>
    </section>
  );
}
