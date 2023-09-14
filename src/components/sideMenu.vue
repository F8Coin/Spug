<template>
    <div>
        <el-menu
            router
            class= "el-menu-vertical-demo"
            unique-opened
            background-color="#545C64"
            text-color="#FFFFFF"
            active-text-color="#FFD04B"
            @select="handleSelect"
            :default-active="defaultActiveIndex">
            <Menus :routerList="menuData"></Menus>
        </el-menu>   
    </div>
</template>

<style lang="less">
    .el-menu {
        border: none !important;
    }
</style>

<script>
import Menus from "./menus.vue"
export default {
    data(){
        return {
            defaultActiveIndex: "/home",
            menuData: [
                {
                    "path": "/home",
                    "name": "首页",
                    "icon": "el-icon-s-home"
                },
                {
                    "path": "/control",
                    "name": "工作台",
                    "icon": "el-icon-s-platform"
                },
                {
                    "path": "/host",
                    "name": "主机管理", 
                    "icon": "el-icon-s-finance"
                },
                {
                    "path": "/command",
                    "name": "批量执行",
                    "icon": "el-icon-money",
                    "children": [
                        {
                            "path": "/command/task",
                            "name": "执行任务",
                            "icon": ""
                        },
                        {
                            "path": "/command/template",
                            "name": "模板管理",
                            "icon": ""
                        }
                    ]
                },
                {
                    "path": "/application",
                    "name": "应用发布",
                    "icon": "el-icon-set-up",
                    "children": [
                        {
                            "path": "/application/manage",
                            "name": "应用管理",
                            "icon": ""
                        },
                        {
                            "path": "/application/apply",
                            "name": "发布申请",
                            "icon": ""
                        }
                    ]
                },
                {
                    "path": "/plan",
                    "name": "任务计划",
                    "icon": "el-icon-document-copy"
                },
                {
                    "path": "/config",
                    "name": "配置中心",
                    "icon": "el-icon-coordinate",
                    "children": [
                        {
                            "path": "/config/environment",
                            "name": "环境管理",
                            "icon": ""
                        },
                        {
                            "path": "/config/server",
                            "name": "服务配置",
                            "icon": ""
                        },
                        {
                            "path": "/config/app",
                            "name": "应用配置",
                            "icon": ""
                        }
                    ]
                },
                {
                    "path": "/monitor",
                    "name": "监控中心",
                    "icon": "el-icon-video-camera"
                },
                {
                    "path": "/alarm",
                    "name": "报警中心",
                    "icon": "el-icon-bell",
                    "children": [
                        {
                            "path": "/alarm/history",
                            "name": "报警历史",
                            "icon": ""
                        },
                        {
                            "path": "/alarm/person",
                            "name": "报警联系人",
                            "icon": ""
                        },
                        {
                            "path": "/alarm/group",
                            "name": "报警联系组",
                            "icon": ""
                        }
                    ]
                },
                {
                    "path": "/system",
                    "name": "系统管理",
                    "icon": "el-icon-setting",
                    "children": [
                        {
                            "path": "/system/loginLog",
                            "name": "登录日志",
                            "icon": ""
                        },
                        {
                            "path": "/system/account",
                            "name": "账户管理",
                            "icon": ""
                        },
                        {
                            "path": "/system/role",
                            "name": "角色管理",
                            "icon": ""
                        },
                        {
                            "path": "/system/setting",
                            "name": "系统设置",
                            "icon": ""
                        }
                    ]
                }
                // {
                //     "path": "",
                //     "name": "控制中心",
                //     "icon": "el-icon-setting",
                //     "children": []
                // },
                // {
                //     "path": "",
                //     "name": "课程管理",
                //     "icon": "el-icon-setting",
                //     "children": [
                //         {
                //             "path": "",
                //             "name": "录播课程",
                //             "icon": ""
                //         },
                //         {
                //             "path": "",
                //             "name": "图文课程",
                //             "icon": ""
                //         },
                //         {
                //             "path": "",
                //             "name": "直播课程",
                //             "icon": ""
                //         },
                //         {
                //             "path": "",
                //             "name": "课程专栏",
                //             "icon": ""
                //         },
                //         {
                //             "path": "",
                //             "name": "知识库",
                //             "icon": ""
                //         }
                //     ]
                // },
                // {
                //     "path": "",
                //     "name": "学习计划",
                //     "icon": "el-icon-setting",
                //     "children": []
                // },
                // {
                //     "path": "",
                //     "name": "课件资源",
                //     "icon": "el-icon-setting",
                //     "children": []
                // },
                // {
                //     "path": "",
                //     "name": "考试管理",
                //     "icon": "el-icon-setting",
                //     "children": [
                //         {
                //             "path": "",
                //             "name": "试卷管理",
                //             "icon": ""
                //         },
                //         {
                //             "path": "",
                //             "name": "题库管理",
                //             "icon": ""
                //         }
                //     ]
                // },
                // {
                //     "path": "",
                //     "name": "学习记录",
                //     "icon": "el-icon-setting",
                //     "children": []
                // }
            ]
        }
    },
    created(){

    },
    methods: {
        handleSelect(index){
            this.defaultActiveIndex = index
        }
    },
    components: {
        Menus: Menus
    }
}
</script>