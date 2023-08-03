import { z } from "zod";

export const createAirConditionerSchema = z.object({
  brand: z.string(),
  model: z.string(),
});

export const updateAirConditionerSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
});

export const deleteAirConditionerSchema = z.object({
  id: z.string().uuid(),
});

const TURN_ON_AIR_CONDITIONER_COMMAND = "1";
const TURN_OFF_AIR_CONDITIONER_COMMAND = "0";

export const updateAirConditionerStateSchema = z.object({
  state: z.enum([
    TURN_ON_AIR_CONDITIONER_COMMAND,
    TURN_OFF_AIR_CONDITIONER_COMMAND,
  ]),
});
