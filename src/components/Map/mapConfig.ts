import { Expression } from 'mapbox-gl'
import { companyTypes } from '../../data/util/constants'

export const mapStyle = 'mapbox://styles/mapbox/dark-v9'
export const mapboxApiAccessToken =
  'pk.eyJ1IjoibmVvcG9zdG1vZGVybiIsImEiOiJja3NvYWhvdDUwN2hhMnBwanIxZzVranJiIn0.Fsr215tdb0fCdWDy8JXkHg'

export const geoJsonPaint = {
  'circle-stroke-width': 0,
  'circle-radius': {
    base: 1.5,
    stops: [
      [11, 5],
      [18, 10],
    ],
  },
  'circle-opacity': {
    base: 0.8,
    stops: [
      [11, 0.3],
      [18, 1],
    ],
  },
  'circle-color': [
    'match',
    ['get', 'category'],

    ...Object.entries(companyTypes)
      .map(([key, { color }]) => [parseInt(key, 10), color])
      .flat(),

    /* other */ 'pink',
  ] as Expression,
}

export const defaultViewport = {
  Augsburg: {
    latitude: 48.367,
    longitude: 10.9,
    zoom: 12,
  },
  Berlin: {
    latitude: 52.515,
    longitude: 13.37,
    zoom: 12,
  },
  Bremen: {
    latitude: 53.075,
    longitude: 8.806,
    zoom: 12,
  },
  Dresden: {
    latitude: 51.05,
    longitude: 13.74,
    zoom: 12,
  },
  Düsseldorf: {
    latitude: 51.22,
    longitude: 6.785,
    zoom: 12,
  },
  Erfurt: {
    latitude: 50.9781,
    longitude: 11.0287,
    zoom: 12,
  },
  'Frankfurt am Main': {
    latitude: 50.11,
    longitude: 8.68,
    zoom: 12,
  },
  'Freiburg (im Breisgau)': {
    latitude: 47.993,
    longitude: 7.84,
    zoom: 13,
  },
  Gera: {
    latitude: 50.876,
    longitude: 12.08,
    zoom: 12,
  },
  Hamburg: {
    latitude: 53.57,
    longitude: 10,
    zoom: 12,
  },
  Heidelberg: {
    latitude: 49.4059,
    longitude: 8.6836,
    zoom: 13,
  },
  Jena: {
    latitude: 50.9225,
    longitude: 11.586,
    zoom: 12,
  },
  Köln: {
    latitude: 50.94,
    longitude: 6.96,
    zoom: 12,
  },
  Leipzig: {
    latitude: 51.34,
    longitude: 12.38,
    zoom: 13,
  },
  Lüneburg: {
    latitude: 53.25,
    longitude: 10.41,
    zoom: 13,
  },
  München: {
    latitude: 48.13,
    longitude: 11.58,
    zoom: 12,
  },
  Nürnberg: {
    latitude: 49.45,
    longitude: 11.08,
    zoom: 13,
  },
  Potsdam: {
    latitude: 52.4,
    longitude: 13.06,
    zoom: 12,
  },
  Saarbrücken: {
    latitude: 49.23,
    longitude: 7,
    zoom: 13,
  },
  Stuttgart: {
    latitude: 48.7793,
    longitude: 9.1773,
    zoom: 12,
  },
  Weimar: {
    latitude: 50.977,
    longitude: 11.3184,
    zoom: 13,
  },
  Würzburg: {
    latitude: 49.79,
    longitude: 9.94,
    zoom: 13,
  },
}
