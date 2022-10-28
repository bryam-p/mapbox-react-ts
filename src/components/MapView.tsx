import { Map } from 'mapbox-gl';
import { useContext, useLayoutEffect, useRef } from 'react'
import { MapContext, PlacesContext } from '../context';
import { Loading } from './Loading';

export const MapView = () => {

  const { isLoading, userLocation } = useContext(PlacesContext)
  const { setMap } = useContext(MapContext)
  const mapDiv = useRef<HTMLDivElement>(null)

  console.log(userLocation);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation,
        zoom: 9,
      });
      map.on('style.load', () => {
        map.setFog({});
      });
      setMap(map);
    }
  }, [isLoading])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div ref={mapDiv} id="prueba" style={{
      backgroundColor: 'red',
      height: '100vh',
      position: 'fixed',
      right: '0',
      top: '0',
      width: '100vw',
    }}>
      {userLocation?.join(",")}
    </div>
  )
}
