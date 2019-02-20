const Router = require('koa-router')
var koa2Req = require('koa2-request')
// var WXBizDataCrypt = require('./WXBizDataCrypt')	



let router = new Router()
router.get('/login', async(ctx)=>{
	// const JSCODE = ctx.request.query.code
	// const APPID = 'wxc9f5b9bfd4fa20c6'
	// const SECRET = 'a2eea793887f17b3810f0bf207470c30'
	// const res = await koa2Req('https://api.weixin.qq.com/sns/jscode2session?appid='+ APPID +'&secret='+ SECRET +'&js_code='+ JSCODE +'&grant_type=authorization_code')
	ctx.body = 6666
})

module.exports = router
