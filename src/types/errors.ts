import { AxiosError } from 'axios';
import { HttpError } from '@interfaces/errors';

export type HttpErrorType = HttpError | AxiosError;

export type ErrorType = HttpErrorType | TypeError;
