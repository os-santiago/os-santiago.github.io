"use client";

import { useState } from "react";
import Image from "next/image";
import { IconX, IconMaximize } from "@tabler/icons-react";
import { type EventPhoto } from "@/data/events";
import { type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type EventDetailGalleryProps = {
  photos: EventPhoto[];
  locale: Locale;
};

export function EventDetailGallery({
  photos,
  locale,
}: EventDetailGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<EventPhoto | null>(null);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="mt-8 w-full">
      {/* Dynamic Cyberpunk Collage Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, idx) => {
          const isPrimary = idx === 0;
          return (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(photo)}
              className={cn(
                "group bg-void/90 relative cursor-pointer overflow-hidden rounded-sm border transition-all duration-300",
                isPrimary
                  ? "border-cyan/40 hover:border-cyan shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_35px_rgba(0,240,255,0.35)] md:col-span-2 lg:col-span-2"
                  : "border-cyan/20 hover:border-cyan/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]",
              )}
            >
              <div className="bg-void relative aspect-video w-full overflow-hidden">
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  sizes={
                    isPrimary
                      ? "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                      : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={idx < 2}
                />

                {/* Cyberpunk HUD frame badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="bg-void/80 border-cyan/40 text-cyan-bright rounded-xs border px-2 py-0.5 font-mono text-[9px] tracking-widest uppercase backdrop-blur-xs">
                    PHOTO #{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Hover overlay with zoom icon */}
                <div className="bg-void/40 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="bg-void/80 border-cyan text-cyan scale-90 transform rounded-full border p-3 shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-transform duration-200 group-hover:scale-100">
                    <IconMaximize size={20} />
                  </span>
                </div>
              </div>

              {/* Photo Caption */}
              {(photo.caption || photo.captionEn) && (
                <div className="border-cyan/15 bg-void-surface/90 flex items-center justify-between border-t px-4 py-3 text-left">
                  <span className="text-cyan-dim/90 font-mono text-[11px] tracking-wide sm:text-xs">
                    {locale === "es" ? photo.caption : photo.captionEn}
                  </span>
                  <span className="text-cyan-deep ml-3 flex-shrink-0 font-mono text-[10px] tracking-widest uppercase">
                    [ + Zoom ]
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="bg-void/90 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-void-surface border-cyan/40 animate-in fade-in zoom-in-95 relative w-full max-w-5xl overflow-hidden rounded-sm border shadow-[0_0_45px_rgba(0,240,255,0.35)] duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
              className="neon-btn-3d border-cyan/50 text-cyan hover:border-cyan absolute top-3 right-3 z-20 flex cursor-pointer items-center justify-center rounded-sm border p-2 transition-all duration-300"
            >
              <IconX size={20} />
            </button>

            <div className="relative aspect-video max-h-[75vh] w-full">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {(selectedPhoto.caption || selectedPhoto.captionEn) && (
              <div className="border-cyan/20 bg-void border-t p-4 text-center">
                <p className="text-cyan font-mono text-xs tracking-wide sm:text-sm">
                  {locale === "es"
                    ? selectedPhoto.caption
                    : selectedPhoto.captionEn}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
