import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';

const Contact = () => {
  const positionValue = [60.22450738904362, 24.758621188354958];

  return (
    <div>
      <div className="contact">
        <div className="contactHeader">contact leebstore developers team</div>
        <div className="contactEmail">via email: Selim.Bedir@metropolia.fi or fadi.el-khouri@metropolia.fi</div>
        <div className="contactAddress">
          address: metropolia university of applied sciences <br /> Karaportti 2, 02610 Espoo
        </div>
      </div>
      <MapContainer center={positionValue} zoom={15} scrollWheelZoom={false} style={{ height: '60vh', width: '60vh', margin: '0 auto', marginTop: '10em' }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={positionValue}>
          <Tooltip permanent>
            Metropolia Karaportti 2,
            <br />
            02610 Espoo
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Contact;
