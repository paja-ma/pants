import { z } from 'zod'

export const env = z
  .object({ VITE_PRIVY_APP_ID: z.string(), VITE_NODIT_API_KEY: z.string() })
  .parse(import.meta.env)
