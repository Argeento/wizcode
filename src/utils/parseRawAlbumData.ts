export type RawITunesAlbumEntry = {
  id: { attributes: { ['im:id']: string } }
  'im:name': { label: string }
  'im:image': Array<{ label?: string }>
  'im:price': { label: string }
  'im:releaseDate': { label: string }
  rights: { label: string }
  link:
    | { attributes: { href: string } }
    | Array<{ attributes: { href: string } }>
  'im:artist': { label: string; attributes?: { url?: string } }
  category: { attributes: { ['im:id']: string; label: string; url: string } }
}

export function parseRawAlbumData(
  entry: RawITunesAlbumEntry,
  defaultSort: number,
): ITunesAlbum {
  const coverSrc =
    entry['im:image']?.[0]?.label?.replace(/\d+x\d+bb/, '280x280bb') ?? '' // TODO handle missing cover image

  let albumHref = ''
  if (Array.isArray(entry.link)) {
    albumHref = entry.link[0]?.attributes?.href || ''
  } else {
    albumHref = entry.link.attributes.href
  }

  return {
    id: entry.id.attributes['im:id'],
    name: entry['im:name'].label,
    coverSrc,
    price: entry['im:price']?.label,
    release: new Date(entry['im:releaseDate'].label),
    rights: entry.rights.label,
    href: albumHref,
    defaultSort,
    artist: {
      id: generateUniqueId(),
      name: entry['im:artist'].label,
      href: entry['im:artist'].attributes?.url ?? '#',
    },
    category: {
      id: entry.category.attributes['im:id'],
      name: entry.category.attributes.label,
      href: entry.category.attributes.url,
    },
  }
}
