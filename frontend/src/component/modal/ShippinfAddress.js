import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import servicesUser from '../../services/registerService';
import { useNavigate } from 'react-router-dom';

const ShippingAddress = () => {
  const urlUser = `/api/users`;
  const [user, setUser] = useState({});
  const handleAddress = () => {
    navigate('/accounts');
  };
  const navigate = useNavigate();
  useEffect(() => {
    servicesUser.getUser(urlUser).then((res) => {
      setUser(res);
    });
  }, [user, urlUser]);

  return (
    <Card sx={{ maxWidth: 800 }} style={{ margin: '0 auto' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14, marginBottom: '1em' }} color="text.secondary" gutterBottom>
          Check if address is correct
        </Typography>
        <Typography variant="h5" component="div" style={{ marginBottom: '1em', color: '#145713', fontWeight: '800' }}>
          Shipping Address
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" component="div" className="stepperStyle">
          <div className="textStyleStepper"> Full name: </div>
          <div className="valueStyleStepper">
            {user?.firstName} {user?.lastName}
          </div>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" component="div" className="stepperStyle">
          <div className="textStyleStepper"> Email:</div> <div className="valueStyleStepper"> {user?.email}</div>
        </Typography>
        <Typography variant="body1" component="div" className="stepperStyle">
          <div className="textStyleStepper">Address:</div>
          <div className="valueStyleStepper">
            {user?.street}, {user?.postalCode}, {user?.city}
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleAddress()} size="small">
          Change address
        </Button>
      </CardActions>
    </Card>
  );
};
export default ShippingAddress;
