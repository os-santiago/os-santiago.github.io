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

export function EventGallery({
  events,
  locale,
  messages: msgs,
}: EventGalleryProps) {
  const pastEvents = events.filter((e) => e.status === "past");

  if (pastEvents.length === 0) return null;

  return (
    <section className="mt-16 w-full text-center">
      <div className="mb-8 flex flex-col items-center justify-center">
        <div className="text-cyan mb-1 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase">
          <IconSparkles size={14} className="text-cyan" />
          {msgs["events.gallery"]}
        </div>
        <h2 className="text-cyan font-display text-2xl font-bold tracking-wide sm:text-3xl">
          {msgs["events.pastEvents"]}
        </h2>
      </div>

      <div
        className={cn(
          "grid w-full gap-6 sm:gap-8",
          pastEvents.length === 1
            ? "mx-auto max-w-3xl grid-cols-1"
            : "grid-cols-1 md:grid-cols-2",
        )}
      >
        {pastEvents.map((event) => {
          const detailUrl = `/${locale}/events/${event.id}`;
          return (
            <GlitchCard
              key={event.id}
              href={detailUrl}
              className="cyber-hud-box bg-void-surface/70 border-cyan/15 hover:border-cyan/40 group flex h-full cursor-pointer flex-col items-center rounded-sm border p-6 text-center backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] sm:p-7"
            >
              {/* Event Header: Title with uniform min-height for clean alignment */}
              <div className="mb-3 flex min-h-[3.25rem] w-full items-center justify-center">
                <h3 className="text-cyan group-hover:text-cyan-bright font-display text-center text-xl font-bold tracking-wide transition-colors sm:text-2xl">
                  {locale === "es" ? event.name : event.nameEn}
                </h3>
              </div>

              {/* Flyer Cover Banner */}
              {(event.coverImage ||
                (event.photos && event.photos.length > 0)) && (
                <div className="border-cyan/30 bg-void group-hover:border-cyan/60 relative mx-auto my-auto aspect-[16/9] w-full overflow-hidden rounded-sm border shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] sm:aspect-[21/9]">
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
