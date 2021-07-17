import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import(/* webpackChunkName: "about" */ '../views/app/views/Home.vue'),
		meta: {}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "about" */ '../views/app/views/Login.vue'),
		meta: {}
	},
	{
		path: '/admin',
		name: 'admin',
		component: () => import(/* webpackChunkName: "about" */ '../views/app/Frame.vue'),
		meta: {
			requiresAuth: true
		},
		children: [
			{
				path: 'people',
				name: 'people',
				component: () => import(/* webpackChunkName: "about" */ '../views/app/views/People.vue'),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: 'attendance',
				name: 'attendance',
				component: () => import(/* webpackChunkName: "about" */ '../views/app/views/Attendance.vue'),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: 'settings',
				name: 'settings',
				component: () => import(/* webpackChunkName: "about" */ '../views/app/views/Settings.vue'),
				meta: {
					requiresAuth: true
				}
			}
		]
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (localStorage.getItem('jwt') == null) {
			next({
				path: '/login',
				params: { nextUrl: to.fullPath }
			});
		} else {
			//let user = JSON.parse(localStorage.getItem('user'));
			next();
		}
	} else {
		next();
	}
});
export default router;
