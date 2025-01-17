'use client'
import { useState, useEffect } from 'react'
interface InstagramPost {
  id: string
  caption: string
  media_type: string
  media_url: string
}

const tokenIG =
  'IGAAOC2nVVqL9BZAE5XWUhWVjRUbGJlbEtrbmdETlF3U3lLN2dyYS1LQ3B4Y2hYcFRmZADRSX2JoOGZAuemtkQW5Nc1N6YzE1bWRsN3d6SWZAFdElWelgwcXZAZAd2RiNmNNR2ZAvU3FLWnBzaUZACaGRELWVCeWU0akw0b2s1LU9lWHVZAMAZDZD'

const InstaFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const instagramUsername = 'your_username'
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=${tokenIG}`,
      )
      const data = await response.json()
      setPosts(data.data)
    }

    fetchData()
  }, [])

  return (
    <div className="mx-auto w-auto sm:max-w-[30rem] lg:max-w-[60rem]">
      <div className="instagram-feed grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
        {posts.map((post) => (
          <div key={post.id} className="instagram-post">
            <a
              href={`https://www.instagram.com/p/${post.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={post.media_url}
                alt={instagramUsername}
                className="h-auto w-full"
                width="300"
                height="300"
              />
            </a>
          </div>
        ))}
      </div>
      <h3 className="py-8  text-[20px] md:text-[32px]">
        Follow me @{instagramUsername}
      </h3>
    </div>
  )
}

export default InstaFeed
