export enum SortValue {
  Default = 'default',
  Name = 'name',
  Artist = 'artist',
  ReleaseDate = 'releaseDate',
}

export const SORT_OPTIONS = [
  { label: 'iTunes', value: SortValue.Default },
  { label: 'Name', value: SortValue.Name },
  { label: 'Artist', value: SortValue.Artist },
  { label: 'Release date', value: SortValue.ReleaseDate },
] as const

export function sortAlbums(albums: ITunesAlbum[], sortBy: SortValue) {
  return [...albums].sort((a, b) => {
    switch (sortBy) {
      case SortValue.Default:
        return a.defaultSort - b.defaultSort
      case SortValue.Name:
        return a.name.localeCompare(b.name)
      case SortValue.Artist:
        return a.artist.name.localeCompare(b.artist.name)
      case SortValue.ReleaseDate:
        return a.release.getTime() - b.release.getTime()
      default:
        return assertNever(sortBy)
    }
  })
}

function assertNever(value: never): never {
  throw new Error(`Unhandled sort option: ${value}`)
}
