import { useState } from 'react';

interface SkeletonProps {
  variant?: 'text' | 'title' | 'image' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
}: SkeletonProps) {
  const skeletons = Array.from({ length: count });

  const baseClasses = 'skeleton';
  const variantClasses = {
    text: 'skeleton-text',
    title: 'skeleton-title',
    image: 'skeleton-image',
    circle: 'skeleton-circle',
    rect: '',
  }[variant];

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'string' ? width : `${width}px`;
  if (height) style.height = typeof height === 'string' ? height : `${height}px`;

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`${baseClasses} ${variantClasses} ${className}`}
          style={style}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

interface SkeletonCardProps {
  variant?: 'poster' | 'landscape';
}

export function SkeletonCard({ variant = 'poster' }: SkeletonCardProps) {
  return (
    <div className="animate-pulse">
      <div
        className={`bg-neutral-800 rounded-lg mb-3 ${
          variant === 'poster' ? 'aspect-[2/3]' : 'aspect-video'
        }`}
      />
      <Skeleton variant="title" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  );
}

interface SkeletonHeroProps {}

export function SkeletonHero({}: SkeletonHeroProps) {
  return (
    <div className="animate-pulse">
      <div className="h-[60vh] min-h-[500px] bg-neutral-800 rounded-xl mb-6" />
      <div className="space-y-3 px-4">
        <Skeleton variant="title" width="40%" height={40} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="50%" />
      </div>
    </div>
  );
}

interface SkeletonContentRowProps {
  cardCount?: number;
}

export function SkeletonContentRow({ cardCount = 5 }: SkeletonContentRowProps) {
  return (
    <div className="py-6">
      <Skeleton variant="title" width={200} height={32} className="mb-4" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: cardCount }).map((_, i) => (
          <SkeletonCard key={i} variant="poster" />
        ))}
      </div>
    </div>
  );
}

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export function ImageWithSkeleton({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-video',
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${aspectRatio} ${className}`}>
      {isLoading && (
        <div className="absolute inset-0">
          <Skeleton variant="image" className="w-full h-full" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
