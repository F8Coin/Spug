<template>
    <div class="loginLog_page">
        <div class="up_search">
            <el-form :inline="true" :model="formSearch" class="demo-form-inline" size="small">
                <el-form-item label="账户名称">
                    <el-input v-model="formSearch.user" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="登录IP">
                    <el-input v-model="formSearch.ip" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="down_content">
            <el-table>
                
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            formSearch: {
                user: "",
                ip: ""
            }
        }
    },
    methods: {
        onSubmit(){
            console.log("点击查询")
        }
    }
}
</script>


<style lang="less">
    .loginLog_page {
        .up_search {
            padding: 20px 30px;
            background-color: #ffffff;
            border-radius: 6px;
        }
        .down_content {
            padding: 20px 30px;
            background-color: #ffffff;
            border-radius: 6px;
        }
    }
</style>