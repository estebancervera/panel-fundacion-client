import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/app/Frame.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{
				path: '/people',
				component: () => import(/* webpackChunkName: "about" */ '../views/app/views/People.vue'),
				meta: {
					//requiresAuth: true
				}
			},
			{
				path: '/attendance',
				name: 'Attendance',
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import(/* webpackChunkName: "about" */ '../views/app/views/Attendance.vue'),
				meta: {
					//requiresAuth: true
				}
			},
			{
				path: '/settings',
				name: 'Settings',
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import(/* webpackChunkName: "about" */ '../views/app/views/Settings.vue'),
				meta: {
					//requiresAuth: true
				}
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "about" */ '../views/app/views/Login.vue'),
		meta: {
			guest: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
