module.exports = {
  apps: [
    {
      name: `icchaporon-invoice-client`,
      script: "serve",
      env: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 4001,
        PM2_SERVE_SPA: "true",
        NODE_ENV: "production",
      },
    },
  ],
};
