// import Image from 'next/image'

// import { VideoDialog } from '@/components/common/VideoDialog/VideoDialog'
// import { PlayButton } from '@/components/ui/PlayButton/PlayButton'

// type VideoProps = { poster?: { alt: string; src: string }; src: string }

// export const Video = ({ poster, src }: VideoProps) => (
//   <section className="relative overflow-hidden bg-red rem:h-[500px] lg:rem:h-[600px] xl:rem:h-[800px]">
//     <div className="min-h-full w-full overflow-hidden bg-background md:absolute md:right-0 md:top-1/2 md:w-3/4 md:max-w-[calc(50%+550px-175px)] md:-translate-y-1/2 md:rounded-l-full md:before:block md:before:pt-[120%]">
//       <div className="absolute top-1/2 w-full -translate-y-1/2 rem:h-[500px] lg:rem:h-[600px] xl:rem:h-[800px]">
//         {poster && (
//           <Image
//             alt={poster.alt}
//             className="object-cover"
//             fill
//             sizes="(min-width: 768px) 75vw, 100vw"
//             src={poster.src}
//           />
//         )}
//         <VideoDialog
//           src={src}
//           trigger={
//             <PlayButton className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rem:size-[104px] xl:rem:size-[237px]" />
//           }
//         />
//       </div>
//     </div>
//   </section>
// )
