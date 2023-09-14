import Vue from 'vue'
import VueRouter from 'vue-router'
// import { Store } from 'vuex'
import Layout from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: {path: "/home/index"},
		component: Layout
	},
	{
		path: '/home',
		redirect: {path: "/home/index"},
		component: Layout,
		children: [
			{
				path: 'index',
				name: 'home',
				meta: {
					title: "首页",
					requireAuth: true
				},
				component: () => import("../views/home/index.vue")
			},
		]
	},
	{
		path: '/control',
		redirect: {path: "/control/index"},
		component: Layout,
		children: [
			{
				path: 'index',
				name: 'control',
				meta: {
					title: "控制台",
					requireAuth: true
				},
				component: () => import("../views/control/index.vue")
			},
		]
	},
	{
		path: '/host',
		redirect: {path: "/host/index"},
		component: Layout,
		children: [
			{
				path: 'index',
				name: 'host',
				meta: {
					title: "主机管理",
					requireAuth: true
				},
				 component: () => import("../views/host/index.vue")
			}
		]
	},
	{
		path: "/command",
		component: Layout,
		children: [
			{
				path: "task",
				name: "task",
				meta: {
					title: "执行任务",
					requireAuth: true
				},
				component: () => import("../views/command/task.vue")
			},
			{
				path: "template",
				name: "template",
				meta: {
					title: "模板管理",
					requireAuth: true
				},
				component: () => import("../views/command/template.vue")
			}	
		]
	},
	{
		path: '/login',
		name: 'login',
		meta: {
		    title: "登录",
			requireAuth: false
		},
		component: () => import("../views/login.vue")
	},
	{
		path: '/system',
		component: Layout,
		children: [
			{
				path: "loginLog",
				name: "loginLog",
				meta: {
					title: "登录日志",
					requireAuth: true
				},
				component: () => import("../views/system/loginLog.vue")
			}
		]
	},
	{
        path: '*',
        redirect: { path: 'home' },
    }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to,from,next) => {
	if(to.meta.title){
		document.title = "三旺通信-"+to.meta.title;
	} 
	if(to.meta.requireAuth){
		var user_token = sessionStorage.getItem("user_token")
		if(!user_token && to.path.indexOf("login") == -1){
			next({
				path: "/login",
				query: {redirect: to.fullPath}
			})
		}else {
			next();
		}
	}else {
		next();
	}
})

export default router
