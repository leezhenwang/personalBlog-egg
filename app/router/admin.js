/* eslint-disable comma-spacing */
/* eslint-disable strict */
module.exports = app => {// admin后台分支api
  const { router, controller } = app;
  let adminauth = app.middleware.adminauth()//判断是否有session的中间件
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
};