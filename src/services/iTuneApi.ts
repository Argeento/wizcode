export type ITunesCategory = {
  id: string
  name: string
  href: string
}

export type ITunesArtist = {
  id: number
  name: string
  href: string
}

export type ITunesAlbum = {
  id: string
  name: string
  coverSrc: string
  price?: string
  release: Date
  rights: string
  href: string
  artist: ITunesArtist
  category: ITunesCategory
}

let id = 0

function parseAlbumData(entry: any): ITunesAlbum {
  return {
    id: entry.id.attributes['im:id'],
    name: entry['im:name'].label,
    coverSrc: entry['im:image'][2].label,
    price: entry['im:price'].label,
    release: new Date(entry['im:releaseDate'].label),
    rights: entry.rights.label,
    href: entry.link.attributes.href,
    artist: {
      id: id++,
      name: entry['im:artist'].label,
      href: entry['im:artist'].attributes?.url,
    },
    category: {
      id: entry.category.attributes['im:id'],
      name: entry.category.attributes.label,
      href: entry.category.attributes.url,
    },
  }
}

export function useFetchTopAlbums() {
  const loading = ref(true)
  const error = ref(false)
  const albums = ref<ITunesAlbum[]>([])

  onBeforeMount(async () => {
    try {
      const response = await fetch(
        'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
      )
      const data = await response.json()
      albums.value = data.feed.entry.map(parseAlbumData)
    } catch (err) {
      console.error(err)
      error.value = true
    } finally {
      loading.value = false
    }
  })

  return { loading, error, albums }
}
