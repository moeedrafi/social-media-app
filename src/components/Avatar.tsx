import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size: number;
  className?: string;
}

const Avatar = ({ alt, size, src, className }: AvatarProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  );
};

export default Avatar;
