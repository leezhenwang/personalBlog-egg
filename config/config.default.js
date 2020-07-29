/* eslint valid-jsdoc: "off" */

'use strict';
let isOnline = false
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1593566376369_1736';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    // database configuration
    client: {
      // host
      host: '127.0.0.1',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      //password: 'root',
      password: isOnline ? '*********' : 'root',
      // database
      database: 'foreground',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*'],
    // domainWhiteList: ['http://localhost:3000'],//白名单
  }
  config.cors = {
    origin: isOnline ? 'http://129.204.206.80:88' : 'http://localhost:3000', //线上只允许这个域进行接口访问
    credentials: true,// 允许cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  return {
    ...config,
    ...userConfig,
  };
};
