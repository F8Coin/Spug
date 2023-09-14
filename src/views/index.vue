<template>
	<div class="layout_page">
		<el-container class="main_container">
			<el-aside width="250px" class="l_content">
				<div class="logo">
                    <img :src="logoSrc" alt="">
                </div>
				<sideMenu class="menu"></sideMenu>
			</el-aside>
			<el-container class="r_content">
                <el-header class="t_header">
                    <div class="l_config">
                        <span class="title">工业以太网管理系统</span>
                    </div>
                    <div class="r_config">
                        <el-tooltip class="item" effect="dark" content="存档" placement="bottom">
                            <span class="h_save el-icon-document"></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="重启" placement=" bottom">
                            <span class="h_restart el-icon-switch-button"></span>
                        </el-tooltip>
                        <el-dropdown class="dropdown"  @command="handleCommand">
                            <span class="el-dropdown-link">
                                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>帮助文档</el-dropdown-item>
                                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-main class="c_content">
                    <router-view></router-view>
                </el-main>
                <el-footer class="b_footer">
                    <span class="copyright">Copyright (©) 深圳市三旺通信股份有限公司</span>
                </el-footer>
            </el-container>
		</el-container>      
	</div>
</template>

<script>
import sideMenu from '@/components/sideMenu.vue';
import logoSrc from "@/assets/img/logo.png"
export default {
  components: { sideMenu },
	name: 'Home',
	data(){
		return {
			logoSrc: logoSrc
		}
	},
	created(){

	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
        logout(){
            sessionStorage.setItem("user_token",false);
            this.$router.push("/login");
        },
        handleCommand(command) {
            if(command == 'logout'){
                this.logout()
            }
        }
	}
}
</script>

<style lang="less">
    .layout_page {
        height: 100%;
        overflow: hidden;
        .main_container {
            height: 100%;
            box-sizing: border-box;
            .l_content {
                box-sizing: border-box;
                background-color: #545C64;
                .logo {
                    height: 60px;
                    text-align: center;
                    background-color: @bg_color_1;
                }
            }
            .r_content {
                background-color: @bg_color_eee;
                .t_header {
                    background-color: @bg_color_1;
                    line-height: 60px;
                    .l_config {
                        float: left;
                        .title {
                            font-size: 16px;
                            font-weight: bold;
                            letter-spacing: 1px;
                            color: @text_color_fff;
                        }
                    }
                    .r_config {
                        text-align: right;
                        .h_save {
                            font-size: 20px;
                            cursor: pointer;
                            font-weight: bold;
                            color: @text_color_fff;
                            vertical-align: middle;
                            &:hover {
                                color: @text_color_active;
                            }
                        }
                        .h_restart {
                            font-size: 20px;
                            cursor: pointer;
                            font-weight: bold;
                            margin: 0px 16px;
                            color: @text_color_fff;
                            vertical-align: middle;
                            &:hover {
                                color: @text_color_active;
                            }
                        }
                        .dropdown {
                            cursor: pointer;
                            color: @text_color_fff;
                            .el-dropdown-link {
                                &:hover {
                                    color: @text_color_active;
                                }
                            }
                        }
                    }
                }
                .c_content {
                    background-color: #eee;
                }
                .b_footer {
                    height: 48px !important;
                    line-height: 48px;
                    text-align: center;
                    background-color: @bg_color_1;
                    .copyright {
                        font-size: 14px;
                        color: @text_color_fff;
                    }
                }
            }
        }
    }

    .el-menu-item-group {
        .el-menu-item {
            padding-left: 48px !important; 
        }
    }
</style>
