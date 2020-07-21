'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => { // 请求最开始进入的地方
  // const { router, controller } = app;
  // router.get('/', controller.home.index);
  // router.get('/list', controller.home.list);
  require('./router/default')(app);
  require('./router/admin')(app);
};
