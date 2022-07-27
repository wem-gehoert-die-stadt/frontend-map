export const CITIES = [
  'Augsburg',
  'Berlin',
  'Bremen',
  'Dresden',
  'Düsseldorf',
  'Erfurt',
  'Frankfurt am Main',
  'Freiburg (im Breisgau)',
  'Gera',
  'Hamburg',
  'Heidelberg',
  'Jena',
  'Köln',
  'Leipzig',
  'Lüneburg',
  'München',
  'Nürnberg',
  'Potsdam',
  'Saarbrücken',
  'Stuttgart',
  'Weimar',
  'Würzburg',
] as const
export type City = typeof CITIES[number]

export const slugifyCityName = (cityName: City): string =>
  cityName
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ /g, '-')
    .replace(/[^a-z-]/g, '')

export const detectCityFromUrl = (): City => {
  const url = window.location.href.toLowerCase()

  const detectedCity = CITIES.find(
    (cityName) =>
      url.includes(cityName.toLowerCase()) ||
      url.includes(slugifyCityName(cityName)),
  )
  if (detectedCity) {
    return detectedCity
  }
  throw Error("[util/city] Couldn't identify city from URL!")
}
