import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';

const Contact = () => {
  const positionValue = [60.22450738904362, 24.758621188354958];

  return (
    <div>
      Hello
      <MapContainer center={positionValue} zoom={15} scrollWheelZoom={false} style={{ height: '40vh', width: '40vh', margin: '0 auto', marginTop: '10em' }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={positionValue}>
          <Tooltip permanent>
            Karaportti 2,
            <br />
            02610 Espoo
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Contact;
