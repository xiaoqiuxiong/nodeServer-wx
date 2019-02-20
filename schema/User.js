const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建UserShema
const userSchema = new Schema({
    userId :{type:ObjectId},           //用户id
    openid: String,                    //用户唯一标识
    session_key: String,               //用户会话密钥
    unionid: String,                   //用户在开放平台的唯一标识符
    nickName: String,                  //用户昵称
    gender: Number,                    //用户性别
    country: String,                   //用户国家
    province: String,                  //用户省份
    city: String,                      //用户城市
    language: String,                  //用户使用语言
    isLogin: Boolean,                  //用户是否登录
    createAt:{type:Date, default:Date.now()},
    lastLoginAt:{type:Date, default:Date.now()}
}) 

//发布模型
mongoose.model('User',userSchema)