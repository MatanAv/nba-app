import { StatusCodes } from 'http-status-codes';

const isHttpErrorStatus = (status: number) => !!StatusCodes[status];

export { isHttpErrorStatus };
