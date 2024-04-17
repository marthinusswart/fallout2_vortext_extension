
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('vortex-api/bin/webpack').default;

module.exports = webpack('fallout2-extension', __dirname, 5);

