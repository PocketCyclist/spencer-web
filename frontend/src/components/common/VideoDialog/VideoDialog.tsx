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
              className="fixed right-0 top-0 z-50 h-16 w-16 bg-foreground"
              aria-label="Close"
            >
              <span className="absolute left-1/2 top-1/2 h-0.5 w-8 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-background before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rotate-90 before:rounded-full before:bg-background before:transition-transform" />
            </button>
          </Dialog.Close>
          <Dialog.Content className="fixed left-1/2 top-1/2 max-w-full -translate-x-1/2 -translate-y-1/2">
            <YouTube
              className="youtube-video-container h-screen w-screen md:p-12"
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
