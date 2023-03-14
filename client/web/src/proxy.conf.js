const TRG =
  process.env.npm_lifecycle_event === 'start:dev'
    ? process.env.DEV_USER
    : 'tst';

const PROXY_CONFIG = {
  '/middleware/*': {
    target: `https://${TRG}-seefit.inovfitness.com`,
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
};

module.exports = PROXY_CONFIG;
