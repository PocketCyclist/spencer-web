import Image from 'next/image'

type SmallMediaImageProps = {
  alt: string
  src: string
}

export const SmallMediaImage = ({ alt, src }: SmallMediaImageProps) => (
  <Image
    alt={alt}
    className="object-cover"
    fill
    sizes="(min-width: 1024px) 255px, 50vw"
    src={src}
  />
)
