import { Response } from "express";

/**
 * Creates a reusable response payload
 *
 */
const createResponse =
  (message: string, data: object[] | null = null, status: string = "success") =>
  (res: Response, code: number) => {
    return res.status(code).json({ status, message, data });
  };

export default createResponse;
