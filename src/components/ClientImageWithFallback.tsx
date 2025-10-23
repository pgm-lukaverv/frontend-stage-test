"use client";
import { useState } from "react";
import Image, { ImageProps } from "next/image";

type ClientImageWithFallbackProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
};

export default function ClientImageWithFallback({
  src,
  fallbackSrc = "/placeholder.png",
  alt,
  ...props
}: ClientImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      {...props}
    />
  );
}
