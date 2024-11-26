import React, { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

const RecenterAutomatically = ({ lat, lng }) => {
	const map = useMap()
	useEffect(() => {
		map.setView([lat, lng])
		map.panTo([lat, lng])
	}, [lat, lng])
	return null
}
export default function MyMapComponent({ lat, lng, zoom }) {
	return (
		<MapContainer center={[lat, lng]} zoom={zoom} scrollWheelZoom={true}>
			<TileLayer
				attribution='<a href="https://www.openstreetmap.org/copyright"></a>'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={[lat, lng]}></Marker>
			<RecenterAutomatically lat={lat} lng={lng} />
		</MapContainer>
	)
}
