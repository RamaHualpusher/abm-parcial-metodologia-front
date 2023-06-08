import Alert from 'react-bootstrap/Alert';
import * as React from 'react';

interface ErrorAlertProps {
  errorMessage: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errorMessage }) => (
  <Alert variant="danger">
    {errorMessage}
  </Alert>
);

export default ErrorAlert;
