'use client'
import { useState, useEffect } from 'react'
interface InstagramPost {
  id: string
  caption: string
  media_type: string
  media_url?: string
  thumbnail_url?: string
  permalink: string
}

const tokenIG =
  'IGAAQC9FQ3zTxBZAE44V291M091QkFKR2ZA4ODN5MV9Cd01uT3puWWdsRVBuY1pPcmx3SVpwQzVSSDBoYjh2VlVzY21pbndqRXZAKcm1Gd0p5SDd6Q09QX2lzT0V2dXpTTkVrN0RGME1VSmltcWFMUXhtaExmTF9TMi1ROTR5bUpORQZDZD'
const instagramUsername = 'gerardspencer_handpan'
const InstaFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${tokenIG}`,
      )
      const data = await response.json()
      setPosts(data.data)
    }

    fetchData()
  }, [])

  return (
    <div className="mx-auto w-auto px-3 sm:max-w-[30rem] lg:max-w-[60rem]">
      <div className="instagram-feed grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
        {posts.map((post) => (
          <div key={post.id} className="instagram-post pb-full relative w-full">
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full w-full"
            >
              <img
                src={
                  post.media_type === 'VIDEO' || post.media_type === 'REELS'
                    ? post.thumbnail_url
                    : post.media_url
                }
                alt={instagramUsername}
                className="h-full w-full object-cover"
              />
            </a>
          </div>
        ))}
      </div>
      <h3 className="py-8  text-[20px] md:text-[32px]">
        Follow me <strong>@{instagramUsername}</strong>
      </h3>
    </div>
  )
}

export default InstaFeed
