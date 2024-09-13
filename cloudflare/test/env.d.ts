declare module 'cloudflare:test' {
  // Controls the type of `import("cloudflare:test").env`
  interface ProvidedEnv extends Env {
    TEST_MIGRATIONS: D1Migration[]; // Defined in `vitest.config.mts`
    d1DB: D1Config;
    ENVIRONMENT: string;
  }
  export const env: ProvidedEnv;
  export const SELF: any;
}
