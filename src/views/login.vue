<template>
    <div class="login_page">
        <canvas class="cavs" width="100vw" height="100vh"></canvas>
        <div class="loginContent">
            <div class="logo">
                <img class="logoImg" :src="logoImg" alt="">
                <p class="title">灵活、强大、功能全面的管理系统</p>
            </div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm_ref" label-position="left" class="loginForm">
                <el-form-item label="" prop="userName">
                    <el-input type="text" v-model="loginForm.userName" autocomplete="off" prefix-icon="el-icon-user-solid" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submitForm" @click="submitForm('loginForm_ref')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import logoImg from '../assets/img/logo.png'

import {createDots,animateDots} from '../utils/star-canvas'

export default {
    data() {

        // (1) 校验方式1    
        // var ruleName = (rule, value, callback) => {
        //     if (!value) {
        //         return callback(new Error('用户名不能为空'));
        //     }else {
        //         callback();
        //     }
        // };
        // var rulePass = (rule, value, callback) => {
        //     if (value === '') {
        //         callback(new Error('请输入密码'));
        //     } else {
        //         callback();
        //     }
        // };
        return {
            logoImg: logoImg,
            loginForm: {
                userName: 'admin123',
                password: 'admin123'
            },
            rules: { // (2) 校验方式2
                userName: [
                    // { validator: ruleName, trigger: 'blur' }
                    {type: "string", required: true, message: "用户名不能为空", trigger: "blur"},
                    {max: 30, message: "用户名称不能超过30位"}
                ],
                password: [
                    // { validator: rulePass, trigger: 'blur' }
                    {type: "string", required: true, message: "密码不能为空", trigger: "blur"},
                    {min: 8, message: "密码长度不能低于8位"},
                    {max: 16, message: "密码长度不能超过16位"}
                ]
            }
        }
    },
    mounted(){
        createDots();
        requestAnimationFrame(animateDots);
    },
    methods: {
        submitForm(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log("校验通过!");
                    sessionStorage.setItem("user_token",true)
                    // 调用登录接口
                    _this.$axios.post("/api/fcgi.cgi?local/login?session="+new Date().getTime()+"&id="+new Date().getTime(),JSON.stringify({
                        username: "admin123",
                        password: "admin123"
                    }))
                    .then((response) => {
                        console.log("登录成功");
                        console.log("response",response);
                        if(response.data.errCode == 0){
                            console.log("跳转首页")
                            _this.$router.push("/home")
                        }
                    })
                    .catch((err) => {
                        console.log("抛出错误信息");
                        console.log("err",err);
                    })
                    
                } else {
                    console.log('校验不通过!');
                    return false;
                }
            });
        }
    }
}
</script>


<style lang="less">
    .login_page {
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
        background-color: #191919;
        .cavs {
            position: absolute;
            top: 0px;
            left: 0px;    
        }
        .loginContent {
            width: 360px;
            height: 350px;
            margin: 0 auto;
            margin-top: 18vh;
            padding: 30px 45px 60px;
            border-radius: 8px;
            background-color: rgba(48, 48, 48, 0.6);
            box-shadow: 0px 0px 3px 0px #bbb;
            .logo {
                text-align: center;
                .logoImg {
                    height: 80px;
                }
                .title {
                    font-size: 12px;
                    color: #bbbbbb;
                }
            }
            .loginForm {
                margin-top: 60px;
                .el-input__icon {
                    color: #ffffff;
                    font-size: 16px;
                }
                .el-input__inner {
                    font-size: 13px;
                    border: none;
                    color: #ffffff;
                    background-color: #525252;
                }
                .submitForm {
                    margin-top: 45px;
                    width: 100%;
                    border: none;
                    background-color: #393939;
                    &:hover {
                        background-color: #303030;
                    }
                }
            }
        }
    }

</style>