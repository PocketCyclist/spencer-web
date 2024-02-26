export const getYouTubeVideoId = (youtubeLink: string): string | undefined => {
  const regex = /[?&]v=([^?&]+)/
  const match = youtubeLink.match(regex)

  if (match && match[1]) {
    return match[1]
  } else {
    return undefined
  }
}
