'use strict';
// 客户端使用的所有API接口
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api接口';
  }
}

module.exports = HomeController;
