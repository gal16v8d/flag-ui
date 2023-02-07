declare namespace NodeJS {
  /** Merge declaration with `process` in order to override the global-scoped env. */
  export interface ProcessEnv {
    /**
     * Built-in environment variable.
     * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
     */
    readonly NG_APP_ENV: string;
    readonly NG_APP_BASE_URL: string;
    readonly NG_APP_VERSION: string;
    readonly NG_APP_FLAG_KEY: string;
  }
}
