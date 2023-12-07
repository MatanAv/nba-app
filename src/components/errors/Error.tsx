import { HttpErrorType, ErrorType } from '~types/errors';

interface ErrorProps {
  error: ErrorType;
}

const Error = ({ error }: ErrorProps) => (
  <p className='error'>
    Error:
    {(error as HttpErrorType).status ? ` ${(error as HttpErrorType).status} - ` : ' '}
    {error.message}
  </p>
);

export default Error;
