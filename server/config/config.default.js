/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1624780140941_5427';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.UPLOAD_DIR = path.resolve(__dirname, '../app/public');
  return {
    ...config,
    ...userConfig,
  };
};
