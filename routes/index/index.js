const Router = require('koa-router')
const koa2Req = require('koa2-request')
const WXBizDataCrypt = require('./WXBizDataCrypt')	

const APPID = 'wxc9f5b9bfd4fa20c6'
const SECRET = 'a4c1d4086da6c5271f4e043bdc37e43b'

let router = new Router()

router.post('login', async(ctx)=>{
	const body = ctx.request.body
	const JSCODE = body.code
	console.log(JSCODE)
	const url = 'https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&' + 'appid='+ APPID +'&secret='+ SECRET +'&js_code='+ JSCODE
	const res = await koa2Req(url)
	// console.log(res)
	ctx.body = JSON.stringify(res.body)
})

router.get('/', async(ctx)=>{
	ctx.body = 666666
})

module.exports = router
