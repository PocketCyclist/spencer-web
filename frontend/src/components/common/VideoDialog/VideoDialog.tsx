'use client'

import { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

type VideoDialogProps = {
  src: string
  trigger: ReactNode
}

export const VideoDialog = ({ src, trigger }: VideoDialogProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 flex bg-background/95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <Dialog.Close asChild>
          <button
            className="w-16 h-16 fixed top-0 right-0 z-50 bg-background"
            aria-label="Close"
          >
            <span className="w-8 h-0.5 absolute top-1/2 left-1/2 rounded-full bg-foreground -translate-x-1/2 -translate-y-1/2 rotate-45 before:w-full before:h-full before:absolute before:top-0 before:left-0 before:rounded-full before:bg-foreground before:transition-transform before:rotate-90" />
          </button>
        </Dialog.Close>
        <Dialog.Content className="max-w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* TODO: Youtube Iframe/Vimeo */}
          {src}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
)
