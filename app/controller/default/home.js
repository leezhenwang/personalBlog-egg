'use strict';
// 客户端使用的所有API接口
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // 获取用户表的数据
    let result = await this.app.mysql.get("blog_content",{})//blog_content对应表名
    console.log(result);
    this.ctx.body = result;
  }
  async getArticleList(){
    let sql =`
      SELECT article.id as articlId,
      article.title as title,
      article.introduce as introduce,
      FROM_UNIXTIME(article.addTime/1000,'%Y-%m-%d %H:%i:%s' ) as addTime,
      article.view_count as view_count,
      type.typeName as typeName
      FROM article LEFT JOIN type ON article.type_id = type.Id
    `
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: results
    }
  }
  async getArticleById(){
    //接收参数
    let id = this.ctx.params.id
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
}

module.exports = HomeController;
