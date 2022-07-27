import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import MapGL, { Layer, Source, Popup } from 'react-map-gl'
import styled from 'styled-components'

import useSelectedObjectId from '../../util/useSelectedObjectId'
import { PublicOrInternalAddresses } from '../../data/addresses/addressDataType'
import { City } from '../../data/util/city'
import useGeoJson from '../../util/useGeoJson'
import {
  COLLAPSED_SIDEBAR_BREAKPOINT,
  WIDTH_SIDEBAR_CLOSED,
  WIDTH_SIDEBAR_FILTER_OPEN,
} from '../../Map.style'

import {
  defaultViewport,
  geoJsonPaint,
  mapboxApiAccessToken,
  mapStyle,
} from './mapConfig'
import PopupContent from './PopupContent'

const Container = styled.div<{ sidebarFilterOpen: boolean }>`
  margin-left: ${({ sidebarFilterOpen }): string =>
    sidebarFilterOpen ? WIDTH_SIDEBAR_FILTER_OPEN : WIDTH_SIDEBAR_CLOSED};

  @media (max-width: ${COLLAPSED_SIDEBAR_BREAKPOINT}) {
    margin-left: 0;
  }
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`

export interface ProjectListViewerMapProps {
  city: City
  internal: boolean
  addresses: PublicOrInternalAddresses
  sidebarFilterOpen: boolean
}

const MapComponent: React.FC<ProjectListViewerMapProps> = ({
  city,
  internal,
  addresses,
  sidebarFilterOpen,
}) => {
  const adjustedDefaultViewport = { ...defaultViewport[city] }

  const selectedObjectId = useSelectedObjectId()
  if (selectedObjectId) {
    const selectedObject = addresses.find(
      (project) => project.object.id === selectedObjectId,
    )
    if (selectedObject) {
      adjustedDefaultViewport.latitude = selectedObject.object.latitude
      adjustedDefaultViewport.longitude = selectedObject.object.longitude
    }
  }
  const [viewport, setViewport] = useState(adjustedDefaultViewport)
  const [scrollDisabled, setScrollDisabled] = useState(!internal)
  const [popup, setPopup] = useState(null)

  const geoJson = useGeoJson(addresses)

  return (
    <Container sidebarFilterOpen={sidebarFilterOpen}>
      <MapGL
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...viewport}
        onViewportChange={setViewport}
        minZoom={11}
        maxZoom={18}
        mapOptions={{
          maxBounds: [
            [
              defaultViewport[city].longitude - 0.5,
              defaultViewport[city].latitude - 0.5,
            ],
            [
              defaultViewport[city].longitude + 0.5,
              defaultViewport[city].latitude + 0.5,
            ],
          ],
        }}
        minPitch={0}
        maxPitch={0}
        dragRotate={false}
        height='100vh'
        width='100%'
        mapStyle={mapStyle}
        mapboxApiAccessToken={mapboxApiAccessToken}
        interactiveLayerIds={
          internal ? ['rls_karte_wohnungseigentum'] : undefined
        }
        onClick={(event) =>
          internal && event.features && setPopup(event.features[0].properties)
        }
      >
        {popup && (
          <Popup
            longitude={popup.longitude}
            latitude={popup.latitude}
            onClose={() => setPopup(null)}
          >
            <PopupContent
              address={addresses.find(({ object: { id } }) => id === popup.id)}
            />
          </Popup>
        )}
        <Source type='geojson' data={geoJson}>
          <Layer
            id='rls_karte_wohnungseigentum'
            type='circle'
            paint={geoJsonPaint}
          />
        </Source>
      </MapGL>
      {scrollDisabled && (
        <Overlay>
          <Button
            variant='contained'
            type='button'
            onClick={() => setScrollDisabled(false)}
          >
            Karte aktivieren
          </Button>
        </Overlay>
      )}
    </Container>
  )
}

export default MapComponent
