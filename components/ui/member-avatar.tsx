"use client";

import { useState } from "react";

type MemberAvatarProps = {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

export function MemberAvatar({
  src,
  fallbackSrc,
  alt,
  className,
  width = 56,
  height = 56,
}: MemberAvatarProps) {
  const [failed, setFailed] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- external GitHub avatar CDN
    <img
      src={failed ? fallbackSrc : src}
      alt={alt}
      width={width}
      height={height}
      crossOrigin="anonymous"
      onError={() => {
        if (!failed) setFailed(true);
      }}
      className={className}
    />
  );
}
