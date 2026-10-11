"use client";

import { cn } from "@/lib/utils";

type MemberAvatarProps = {
  src: string;
  alt: string;
  github: string;
  className?: string;
};

export function MemberAvatar({
  src,
  alt,
  github,
  className,
}: MemberAvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={56}
      height={56}
      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        img.src = `https://github.com/${github}.png`;
        img.onerror = null;
      }}
      className={cn(
        "border-cyan/30 group-hover:border-cyan h-14 w-14 rounded-full border-2 object-cover shadow-[0_0_12px_rgba(0,240,255,0.15)] transition-all",
        className,
      )}
    />
  );
}
