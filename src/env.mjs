import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    ALCHEMY_RPC_URL: z.string().min(1),
    R2_WORKER_ENDPOINT: z.string().min(1),
    R2_WORKER_IMAGE_ENDPOINT: z.string().min(1),
    DB_URL: z.string().min(1),
    HOST: z.string().min(1),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_MUCUS_CONTRACT_ADDRESS: z.string().min(1),
    NEXT_PUBLIC_DPS_CONTRACT_ADDRESS: z.string().min(1),
    NEXT_PUBLIC_FND_CONTRACT_ADDRESS: z.string().min(1),
    NEXT_PUBLIC_MUCUS_FARM_CONTRACT_ADDRESS: z.string().min(1),

    NEXT_PUBLIC_WETH_CONTRACT_ADDRESS: z.string().min(1),
    NEXT_PUBLIC_MUCUS_POOL_CONTRACT_ADDRESS: z.string().min(1),
    NEXT_PUBLIC_USDC_POOL_CONTRACT_ADDRESS: z.string().min(1),

    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
    NEXT_PUBLIC_CHAIN_ID: z.string().min(1),
    NEXT_PUBLIC_HOST: z.string().min(1),
    NEXT_PUBLIC_R2_WORKER_IMAGE_ENDPOINT: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    NEXT_PUBLIC_MUCUS_CONTRACT_ADDRESS:
      process.env.NEXT_PUBLIC_MUCUS_CONTRACT_ADDRESS,
    NEXT_PUBLIC_DPS_CONTRACT_ADDRESS:
      process.env.NEXT_PUBLIC_DPS_CONTRACT_ADDRESS,
    NEXT_PUBLIC_FND_CONTRACT_ADDRESS:
      process.env.NEXT_PUBLIC_FND_CONTRACT_ADDRESS,
    NEXT_PUBLIC_MUCUS_FARM_CONTRACT_ADDRESS:
      process.env.NEXT_PUBLIC_MUCUS_FARM_CONTRACT_ADDRESS,
    NEXT_PUBLIC_WETH_CONTRACT_ADDRESS:
      process.env.NEXT_PUBLIC_WETH_CONTRACT_ADDRESS,
    NEXT_PUBLIC_MUCUS_POOL_CONTRACT_ADDRESS:
      process.env.NEXT_PUBLIC_MUCUS_POOL_CONTRACT_ADDRESS,
    NEXT_PUBLIC_USDC_POOL_CONTRACT_ADDRESS:
      process.env.NEXT_PUBLIC_USDC_POOL_CONTRACT_ADDRESS,

    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_R2_WORKER_IMAGE_ENDPOINT:
      process.env.NEXT_PUBLIC_R2_WORKER_IMAGE_ENDPOINT,

    HOST: process.env.HOST,
    ALCHEMY_RPC_URL: process.env.ALCHEMY_RPC_URL,
    R2_WORKER_ENDPOINT: process.env.R2_WORKER_ENDPOINT,
    R2_WORKER_IMAGE_ENDPOINT: process.env.R2_WORKER_ENDPOINT,
    DB_URL: process.env.DB_URL,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
