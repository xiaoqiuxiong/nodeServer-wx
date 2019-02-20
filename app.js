const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
// const api = require('./routes/apis')

const Router = require('koa-router')
const Redis = require('ioredis')
const redis = new Redis({
    host: '127.0.0.1', //安装好的redis服务器地址
    port: 6379, //端口
    prefix: 'sam:', //存诸前缀
    // ttl: 60, //过期时间
    // db: 0
})
redis.set("test", "66688")
redis.expire("test", 7200); //两小时过期

let func = () => {
    return new Promise(
        (resolve, reject) => {
            redis.get("test", (err, doc) => {
                if (doc) {
                    resolve(doc)
                } else {
                    reject(err)
                }
            })
        }
    )
}
app.use(async (ctx, next) => {
    await func().then(async (res) => {
        console.log(res)
        // ctx.body = res
        await next()
    })

})

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

let router = new Router()

router.use('/', index.routes())
// router.use('/api', index.routes())

app.use(router.routes())
app.use(router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app