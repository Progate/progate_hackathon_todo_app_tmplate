import {ErrorRequestHandler, NextFunction, Request, Response} from "express";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction,
) => {
  console.error(error);
  res.status(500).render("error", {message: "Internal server error"});
};
