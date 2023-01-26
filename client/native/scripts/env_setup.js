#!/usr/bin/env node

module.exports = function (ctx) {
  const fs = require("fs-extra");
  const ncp = require("ncp");
  const replace = require("replace");
  const env = process.env.npm_config_env || "dev";

  const endpointBase = {
    dev: `https://${process.env.DEV_USER}-seefit.inovfitness.com`,
    tst: "https://tst-seefit.inovfitness.com",
    prd: "https://seefit.inovfitness.com",
  }[env];

  const endpoint = `endpoint: '${endpointBase}/middleware'`;

  const replace_base = `<base href="./"><meta http-equiv="Content-Security-Policy" content="
    connect-src * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; 
    default-src * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; 
    font-src * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; 
    frame-src * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; 
    img-src * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; 
    manifest-src * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; 
    media-src * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; 
    object-src * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; 
    script-src * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; 
    style-src * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; 
    base-uri * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; 
    form-action * data: blob: mediastream: filesystem: 'unsafe-inline' 'unsafe-eval'; " />`;

  fs.ensureDirSync("dist");

  ctx.opts.platforms.forEach((platform) => {
    const www_path = {
      android: "./platforms/android/app/src/main/assets/www/",
      ios: "./platforms/ios/www/",
      browser: "./platforms/browser/www/",
    }[platform];

    replace({
      regex: "endpoint: '/middleware'",
      replacement: endpoint,
      paths: [www_path],
      recursive: true,
      silent: true,
      async: false,
      include: "main*.js",
    });

    replace({
      regex: "<base .*>",
      replacement: replace_base,
      paths: [www_path],
      recursive: true,
      silent: true,
      async: false,
      include: "index.html",
    });

    replace({
      regex: "</body>",
      replacement:
        '<script type="text/javascript" src="cordova.js"></script></body>',
      paths: [www_path],
      recursive: true,
      silent: true,
      async: false,
      include: "index.html",
    });
  });
};
