import { message } from "antd";

export class ResponseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const errorHandling = (error: any) => {
  console.log(error);
  // if (error instanceof ResponseError) {
  //   message.error(error.message);
  // } else
  if (error?.data?.error) {
    message.error(error.data.error);
  } else {
    message.error("Something error");
  }
};
