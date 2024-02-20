import { strapiGet } from '@/data/strapi/common'
import { TStrapiListResponse } from '@/data/strapi/types/common/api'
import { TStrapiAlbum } from '@/data/strapi/types/albums'

const Discography = async () => {
  // const pageData = await strapiGet<TStrapiSingleResponse<any>>(
  //   'discography-page',
  // ) // TODO
  const albums = await strapiGet<TStrapiListResponse<TStrapiAlbum>>('albums')
  return (
    <>
      {albums.map((album) => (
        <div key={album.id} className="my-4 bg-amber-50">
          <pre>{JSON.stringify(album, null, 2)}</pre>
        </div>
      ))}
      {/*<pre>*/}
      {/*  {JSON.stringify(albums, null, 2)}*/}
      {/*</pre>*/}
    </>
  )
}

export default Discography
