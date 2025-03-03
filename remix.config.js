const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const { withVanillaExtract } = createVanillaExtractPlugin();

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  serverDependenciesToBundle: [
    /^@vanilla-extract/,
  ],
};