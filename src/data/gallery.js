// Slides 11-15, "Our Work"
const item = (name, category) => ({
  id: name,
  src: `/images/gallery/${name}.webp`,
  thumb: `/images/gallery/${name}-thumb.webp`,
  category,
  alt: `${category} installation by YASH Electricals & Spa Systems`,
})

export const galleryCategories = ['All', 'Sauna Bath', 'Steam Bath']

// Interleaved so the default "All" view alternates between the two categories.
export const gallery = [
  item('sauna-1', 'Sauna Bath'),
  item('steam-1', 'Steam Bath'),
  item('sauna-2', 'Sauna Bath'),
  item('steam-2', 'Steam Bath'),
  item('steam-3', 'Steam Bath'),
  item('sauna-3', 'Sauna Bath'),
  item('steam-4', 'Steam Bath'),
  item('sauna-4', 'Sauna Bath'),
  item('steam-5', 'Steam Bath'),
  item('steam-6', 'Steam Bath'),
  item('steam-7', 'Steam Bath'),
]
