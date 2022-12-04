import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import View from './View';
import ShippingAddress from './ShippinfAddress';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import services from '../../services/cartsService';
import servicesUser from '../../services/registerService';
import SendOrder from './SendOrder';

const steps = ['View shopping list', 'Shipping address', 'Send order'];

export default function CartBuyStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams();
  const [completed, setCompleted] = useState({});
  const [user, setUser] = useState({});
  const urlBuy = '/api/carts/buy';
  const urlUser = `/api/users`;

  useEffect(() => {
    servicesUser.getUser(urlUser).then((res) => {
      setUser(res);
    });
  }, [urlUser]);

  const totalSteps = () => {
    return steps.length;
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <View />;
      case 1:
        return <ShippingAddress />;
      case 2:
        return <SendOrder />;
      default:
        return <View />;
    }
  }
  const handleBuy = () => {
    const updateCart = {
      wish: false,
      address: user,
    };
    services.buyUpdate(urlBuy, updateCart, id).then(() => {
      window.location.href = '/';
      handleReset();
    });
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const goToShopping = () => {
    handleBuy();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '80%', margin: '0 auto', marginTop: '10em' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <form>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography component={'div'} sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={goToShopping()}>Buy</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography component={'div'} sx={{ mt: 2, mb: 1, py: 1 }}>
                {getStepContent(activeStep)}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginBottom: '2em' }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography component={'div'} variant="caption" sx={{ display: 'inline-block' }}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>{completedSteps() === totalSteps() - 1 ? 'Send order' : 'Complete Step'}</Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </form>
      </div>
    </Box>
  );
}
