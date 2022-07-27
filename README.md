# Map component for 'Wem gehört die Stadt' 

Main entry point is `src/Map.tsx`, this is (hopefully) the only component that needs to be 
explicitly used externally. For usage see `src/App.tsx` 

## Recommended usage

The map is hosted standalone and included via an `iframe`. 

## Configuration

### Map layout

Adjust default position and zoom level of maps in `src/components/Map/mapConfig.ts`

### Colors / naming of ownership categories

See `src/data/util/constants.ts`

### Data fetch (endpoint)

Adjust in `src/data/addresses/addressSagas.ts` 
or override with `REACT_APP_ADDRESSES_ENDPOINT` environment variable.

## Gotchas

### URL parameters
Currently, the props for `Map.tsx` are derived from `window.location.href`.
If the substring `ilacomilus` is present, the internal mode/features are activated.
For city-detection see `src/data/util/city.ts`.

### Packages & transpiling
Based on CRA. TypeScript is used throughout. 

Other notable and/or possibly conflicting packages:
- `redux` & `redux-saga` (for legacy reasons, could be optimized away)
- `eslint` (quite strict)
- `@material-ui/{core,icons,lab}` (quite heavy for the given use, but hard to remove)

### Data
Data is not included in repo since it is fetched via API (see `src/data/addresses/addressSagas.ts`).

You can run `npm run preprocess-data` to perform geocoding, 
then a TSV is expected at `../data/addresses.tsv` (path expressed relative to this file).

Local data can be served with `(cd tiny-backend && npm start)`

### Building
Must build with 
```JSON
  "browserslist": [
    "defaults",
    "not ie 11"
  ],
```
in `package.json` (see [here](https://github.com/mapbox/mapbox-gl-js/issues/10173))