export function filterAlbumsByQuery(
  albums: ITunesAlbum[],
  searchQuery: string,
) {
  const query = searchQuery.toLowerCase().trim()

  if (query === '') {
    return albums
  }

  return albums.filter((album) => {
    const searchIn = (album.name + album.artist.name).toLowerCase()
    return searchIn.includes(query)
  })
}

export function filterAlbumsByCategory(
  albums: ITunesAlbum[],
  categoryIds: string[],
) {
  if (categoryIds.length === 0) {
    return albums
  }

  return albums.filter((album) => categoryIds.includes(album.category.id))
}
