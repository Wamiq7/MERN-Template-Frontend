export interface IApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
