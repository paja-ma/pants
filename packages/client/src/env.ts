import { z } from "zod";

export const env = z
  .object({ VITE_PRIVY_APP_ID: z.string() })
  .parse(import.meta.env);
