const API_URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json'

export type ITunesCategory = {
  id: string
  name: string
  href: string
}

export type ITunesArtist = {
  id: string
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
  defaultSort: number
  artist: ITunesArtist
  category: ITunesCategory
}

export function useFetchTopAlbums() {
  const loading = ref(true)
  const error = ref(false)
  const albums = ref<ITunesAlbum[]>([])

  onBeforeMount(async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()

      if (data.feed && data.feed.entry) {
        albums.value = data.feed.entry.map(
          (entry: RawITunesAlbumEntry, index: number) => {
            return parseRawAlbumData(entry, index)
          },
        )
      } else {
        throw new Error('Invalid response data')
      }
    } catch (err) {
      console.error('Album fetch error:', err)
      error.value = true
    } finally {
      loading.value = false
    }
  })

  const categories = computed(() => {
    // Get unique categories
    const categoryMap = new Map<string, ITunesCategory>()
    albums.value.forEach((album) => {
      if (!categoryMap.has(album.category.id)) {
        categoryMap.set(album.category.id, album.category)
      }
    })
    return Array.from(categoryMap.values())
  })

  return { loading, error, albums, categories }
}
