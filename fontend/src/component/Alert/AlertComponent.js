import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertComponent({ variant, header, text }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 10000);
  });

  if (show) {
    return (
      <div className="small">
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          {header} {text}
        </Alert>
      </div>
    );
  }
}
export default AlertComponent;
