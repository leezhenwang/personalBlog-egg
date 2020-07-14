/* eslint-disable */
/* eslint-disable no-debugger */
/* eslint-disable object-curly-spacing */
/* eslint-disable prefer-const */
/* eslint-disable spaced-comment */
/* eslint-disable space-before-blocks */
/* eslint-disable space-infix-ops */
/* eslint-disable semi */
//前台接口
'use strict';
// 客户端使用的所有API接口
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // 获取用户表的数据
    const result = await this.app.mysql.get('blog_content', {});// blog_content对应表名
    console.log(result);
    this.ctx.body = result;
  }
  async getArticleList() {
    const sql =`
      SELECT article.id as articlId,
      article.title as title,
      article.introduce as introduce,
      FROM_UNIXTIME(article.addTime/1000,'%Y-%m-%d %H:%i:%s' ) as addTime,
      article.view_count as view_count,
      type.typeName as typeName
      FROM article LEFT JOIN type ON article.type_id = type.Id
    `;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    }
  }
  async getArticleById(){
    //接收参数
    // let id = this.ctx.params.id
    // 获取 get 传值
    const query = this.ctx.query;
    const { id } = query
    console.log(id)
    let sql = `
      SELECT article.id as articleId,
      article.introduce as introduce,
      article.title as title,
      article.article_content as article_content,
      FROM_UNIXTIME(article.addTime/1000,'%Y-%m-%d %H:%i:%s' ) as addTime,
      article.view_count as view_count,
      type.typeName as typeName,
      type.id as typeId
      From article LEFT JOIN type ON article.type_id = type.id
      WHERE article.id = ${id}
    `
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data: result}
  }
  async getTypeInfo(){ //获取类别名称和编号
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data: result}
  }
  async getListById (){
    let id = this.ctx.query.id;
    let sql = `
      SELECT article.id as id,
      article.title as title,
      article.introduce as introduce,
      FROM_UNIXTIME(article.addTime/1000,'%Y-%m-%d %H:%i:%s' ) as addTime,
      article.view_count as view_count,
      type.typeName as typeName
      FROM article LEFT JOIN type ON article.type_id = type.id
      WHERE type_id = ${id}
    `
    const result = await this.app.mysql.query(sql)
    this.ctx.body= {data: result}
  }
}

module.exports = HomeController;
