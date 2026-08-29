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

export function EventDetailGallery({ photos, locale }: EventDetailGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<EventPhoto | null>(null);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="w-full mt-8">
      {/* Dynamic Cyberpunk Collage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {photos.map((photo, idx) => {
          const isPrimary = idx === 0;
          return (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(photo)}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-sm border bg-void/90 transition-all duration-300",
                isPrimary
                  ? "md:col-span-2 lg:col-span-2 border-cyan/40 shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:border-cyan hover:shadow-[0_0_35px_rgba(0,240,255,0.35)]"
                  : "border-cyan/20 hover:border-cyan/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]"
              )}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-void">
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
                  <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-xs bg-void/80 border border-cyan/40 text-cyan-bright backdrop-blur-xs">
                    PHOTO #{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-void/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-3 rounded-full bg-void/80 border border-cyan text-cyan shadow-[0_0_20px_rgba(0,240,255,0.5)] transform scale-90 group-hover:scale-100 transition-transform duration-200">
                    <IconMaximize size={20} />
                  </span>
                </div>
              </div>

              {/* Photo Caption */}
              {(photo.caption || photo.captionEn) && (
                <div className="border-t border-cyan/15 bg-void-surface/90 px-4 py-3 text-left flex items-center justify-between">
                  <span className="font-mono text-[11px] sm:text-xs text-cyan-dim/90 tracking-wide">
                    {locale === "es" ? photo.caption : photo.captionEn}
                  </span>
                  <span className="font-mono text-[10px] text-cyan-deep uppercase tracking-widest flex-shrink-0 ml-3">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-md p-4 sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-void-surface border border-cyan/40 rounded-sm shadow-[0_0_45px_rgba(0,240,255,0.35)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
              className="neon-btn-3d absolute top-3 right-3 z-20 p-2 rounded-sm border border-cyan/50 text-cyan hover:border-cyan transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <IconX size={20} />
            </button>

            <div className="relative aspect-video w-full max-h-[75vh]">
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
              <div className="p-4 border-t border-cyan/20 bg-void text-center">
                <p className="font-mono text-xs sm:text-sm text-cyan tracking-wide">
                  {locale === "es" ? selectedPhoto.caption : selectedPhoto.captionEn}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
