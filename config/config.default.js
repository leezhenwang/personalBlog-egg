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
      password: isOnline ? 'lzw@'+ 997*2 : 'root',
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
    domainWhiteList: isOnline ? ['http://129.204.206.80:88','http://129.204.206.80:3000'] : ['http://localhost:3000','http://localhost:3001'] // 会被config.cors.origin覆盖
    // domainWhiteList: ['http://localhost:3000'],//白名单
  }
  config.cors = {
    // origin: isOnline ? 'http://129.204.206.80:80' : 'http://localhost:3000', //线上只允许这个域进行接口访问
    origin: isOnline ? function(ctx) { //设置允许来自指定域名请求
      const whiteList = [
        'http://129.204.206.80:88',
        'http://129.204.206.80:3000',
        'http://leezhenwang.website:88',
        'http://leezhenwang.website:80',
        'http://leezhenwang.website',
        'http://localhost:3000',
        'http://localhost:3001'
      ]; //可跨域白名单
      let url = ctx.header.referer// .substr(0,ctx.header.referer.length - 1); //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
      let matchUrl = whiteList.find((item)=>{
        return url.includes(item)
      })
      return matchUrl ? matchUrl : 'http://localhost:3001' //默认允许本地请求3000端口可跨域
  } : function(ctx) { //设置允许来自指定域名请求
    const whiteList = ['http://localhost:3000','http://localhost:3001']; //可跨域白名单
    let url = ctx.header.referer//.substr(0,ctx.header.referer.length - 1); //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
    let matchUrl = whiteList.find((item)=>{
      return url.includes(item)
    })
    return matchUrl ? matchUrl : 'http://localhost:3001' //默认允许本地请求3000端口可跨域
  }, 
    credentials: true,// 允许cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  return {
    ...config,
    ...userConfig,
  };
};
