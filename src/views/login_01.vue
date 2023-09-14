<template>
    <div class="login_page">
        <div class="loginContent">
            <div class="l_content">
                <p class="welcome">欢迎</p>
                <p class="company">深圳市三旺通信股份有限公司</p>
            </div>
            <div class="r_content">
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
    </div>
</template>

<script>
import logoImg from '../assets/img/logo.jpg'
export default {
    data() {

        // (1) 校验方式1    
        // var validateName = (rule, value, callback) => {
        //     if (!value) {
        //         return callback(new Error('用户名不能为空'));
        //     }else {
        //         callback();
        //     }
        // };
        // var validatePass = (rule, value, callback) => {
        //     if (value === '') {
        //         callback(new Error('请输入密码'));
        //     } else {
        //         callback();
        //     }
        // };
        return {
            logoImg: logoImg,
            loginForm: {
                userName: '',
                password: ''
            },
            rules: { // (2) 校验方式2
                userName: [
                    // { validator: validateName, trigger: 'blur' }
                    {type: "string", required: true, message: "用户名不能为空", trigger: "blur"},
                    {max: 30, message: "用户名称不能超过30位"}
                ],
                password: [
                    // { validator: validatePass, trigger: 'blur' }
                    {type: "string", required: true, message: "密码不能为空", trigger: "blur"},
                    {min: 8, message: "密码长度不能低于8位"},
                    {max: 16, message: "密码长度不能超过16位"}
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log("校验通过!");
                    this.$router.push("/");
                } else {
                    console.log('校验不通过!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    computed: mapState([
        "count"  // this.count = store.state.count
    ])
}
</script>

<style lang="less">
    .login_page {
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
        background-color: @bg_color_eee;
        .loginContent {
            display: flex;
            justify-content: center;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            margin-top: 15vh;
            .l_content {
                width: 450px;
                height: 500px;
                color: @text_color_fff;
                padding: 0px 30px;
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
                background-color: @bg_color_3;
                border-right: 1px solid @bd_color_ddd;
                .welcome {
                    font-size: 32px;
                    letter-spacing: 4px;
                    padding-top: 120px;
                }
            }
            .r_content {
                width: 450px;
                height: 500px;
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
                background-color: @bg_color_fff;
                padding: 60px 45px;
                border: @bd_color_main;
                box-sizing: border-box;
                .logo {
                    text-align: center;
                    .logoImg {
                        height: 48px;
                    }
                    .title {
                        font-size: 12px;
                        color: @text_color_bbb;
                    }
                }
                .loginForm {
                    margin-top: 60px;
                    .el-input__icon {
                        color: @text_color_555;
                        font-size: 16px;
                    }
                    .el-input__inner {
                        font-size: 13px;
                    } 
                    .submitForm {
                        margin-top: 45px;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>