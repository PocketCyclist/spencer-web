import Image from 'next/image'

type CymbalProps = {
  right: boolean
}

export const Cymbal = ({ right }: CymbalProps) => {
  if (!right) {
    return null
  }

  return (
    <div
      className="hidden relative -z-[1] select-none 3xl:flex"
      role="presentation"
    >
      <Image
        className="absolute top-1/2 right-0 -translate-y-1/2"
        alt="Handpan decoration"
        src="/images/handpan-right.png"
        width={513}
        height={700}
      />
    </div>
  )
}
