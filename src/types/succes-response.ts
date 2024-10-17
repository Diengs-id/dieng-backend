export type SuccessResponse<T> = {
  status: StatusCode;
  message: string;
  data?: T;
};

export type StatusCode = "success";

export type ValidateResponse = {
  validate: boolean;
  message: string;
};
