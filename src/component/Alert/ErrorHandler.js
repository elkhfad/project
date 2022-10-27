import { useState, useEffect } from 'react';
const ErrorHandler = ({ value, min, text }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (value.length < min && value.length > 0) {
      setError(text);
    } else {
      setError('');
    }
  }, [value, min, text, error]);

  return (
    <div>
      {error.length > 0 && <div className="danger small">{error}</div>} <p></p>
    </div>
  );
};
export default ErrorHandler;
