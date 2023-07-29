import { Request } from "express";
import { z } from "zod";

declare global {
  namespace Express {
    export interface Request {
      validatedData: z.infer<any>;
    }
  }
}
