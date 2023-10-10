export class CustomError extends Error {
    status?:number
    constructor(message: string, status: number) {
      super();
      this.message = message;
      this.name = 'CustomError';
      this.status = status;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError);
      }
    }
  }
  