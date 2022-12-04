import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
const SendOrder = () => {
  return (
    <Card sx={{ maxWidth: 800 }} style={{ margin: '0 auto' }}>
      <CardContent>
        <Typography variant="h5" component="div" style={{ marginBottom: '1em', color: '#145713', fontWeight: '800' }}>
          Thank you for your request, Please press Send order
        </Typography>
      </CardContent>
    </Card>
  );
};
export default SendOrder;
