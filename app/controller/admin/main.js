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
  async getArticleList (){
    const {page,pageSize} = this.ctx.query;
    console.log('11')
    let sql = `
      SELECT article.id as id,
      article.title as title,
      article.view_count as view_count,
      article.introduce as introduce,
      FROM_UNIXTIME(article.addTime/1000,'%Y-%m-%d %H:%i:%s' ) as addTime,
      type.typeName as typeName
      FROM article LEFT JOIN type ON article.type_id = type.id
      ORDER BY article.id DESC
      limit ${pageSize} offset ${(page-1)*pageSize}
    `//跳过多少行再获取多少行
    const resList = await this.app.mysql.query(sql)
    const total = await this.app.mysql.query(`SELECT COUNT(*) FROM article`)
    this.ctx.body = {list: resList,total:total[0]['COUNT(*)']}
  }
  async deleteArticle(){
    let { id } = this.ctx.query;
    const res = await this.app.mysql.delete('article',{id})
    this.ctx.body = {data: res}
  }
  async getArticleById(){
    let { id } = this.ctx.query;
    let sql=`
      SELECT article.id as id,
      article.title as title,
      article.introduce as introduce,
      article.article_content as article_content,
      FROM_UNIXTIME(article.addTime/1000,'%Y-%m-%d %H:%i:%s' ) as addTime,
      article.view_count as view_count,
      type.typeName as typeName,
      type.id as typeId
      FROM article LEFT JOIN type ON article.type_id = type.id
      WHERE article.id = ${id}
    `
    const res = await this.app.mysql.query(sql)
    console.log(id)
    this.ctx.body = {data: res}
  }
}

module.exports = MainController;
