import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateBodyRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req.body);
      req.validatedData = data;
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.issues });
      }
    }
  };
};
