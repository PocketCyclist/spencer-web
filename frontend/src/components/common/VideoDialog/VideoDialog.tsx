'use client'

import { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import YouTube from 'react-youtube'
import { getYouTubeVideoId } from '@/data/strapi/utils/video'

type VideoDialogProps = {
  src: string
  trigger: ReactNode
}

export const VideoDialog = ({ src, trigger }: VideoDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 flex bg-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <Dialog.Close asChild>
            <button
              className="w-16 h-16 fixed top-0 right-0 z-50 bg-foreground"
              aria-label="Close"
            >
              <span className="w-8 h-0.5 absolute top-1/2 left-1/2 rounded-full bg-background -translate-x-1/2 -translate-y-1/2 rotate-45 before:w-full before:h-full before:absolute before:top-0 before:left-0 before:rounded-full before:bg-background before:transition-transform before:rotate-90" />
            </button>
          </Dialog.Close>
          <Dialog.Content className="max-w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <YouTube
              className="youtube-video-container w-screen h-screen md:p-12"
              videoId={getYouTubeVideoId(src)}
              opts={{
                playerVars: {
                  // https://developers.google.com/youtube/player_parameters
                  autoplay: 1,
                },
              }}
            />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
