/* eslint-disable */
//前台接口
'use strict';
// 后台使用的所有API接口
const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    //测试
    this.ctx.body='hi 后台api'
  }
  async checkLogin(){
    let {userName, password } = this.ctx.request.body
    const sql = `
      SELECT userName FROM admin_user 
      WHERE userName = '${userName}'
      AND password = '${password}'
    `
    const res = await this.app.mysql.query(sql)
    if(res.length === 1){
      //登录成功进行sessionId缓存
      let openId = new Date().getTime()
      this.ctx.session.openId = {openId}
      this.ctx.body = {data: '登陆成功', openId}
    }else{
      this.ctx.body = {data: '登陆失败'}
    }
  }
  async getTypeInfo(){
    const resType = await this.app.mysql.select('type')
    this.ctx.body = {data: resType}
  }
  async addArticle (){
    let newArticleObj = this.ctx.request.body
    const result = await this.app.mysql.insert('article',newArticleObj)
    const isSuccess = result.affectedRows === 1
    console.log(result)
    const insertId = result.insertId;
    this.ctx.body = {
      isSuccess,
      insertId,
    }
  }
  async updateArticle (){
    let newArticleObj = this.ctx.request.body
    const result = await this.app.mysql.update('article',newArticleObj)
    const isSuccess = result.affectedRows === 1
    console.log(result)
    this.ctx.body = {
      isSuccess,
    }
  }
}

module.exports = MainController;
