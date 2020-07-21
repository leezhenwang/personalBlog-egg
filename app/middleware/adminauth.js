module.exports = options =>{
  return async function adminauth(ctx,next){//验证登录了才能使用接口
    console.log(ctx.session.openId)
    if(ctx.session.openId){
      await next()//向下执行
    }else{
      ctx.body = {data: '没有登陆'}
    }
  }
}