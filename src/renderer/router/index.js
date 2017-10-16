import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: require('@/pages/LoginPage')
        },
        {
            path: '/home',
            name: 'Home',
            component: require('@/pages/HomePage')
        },
        {
            path: '/security-form',
            name: 'SecurityForm',
            component: require('@/pages/SecurityFormPage')
        },
        {
            path: '/security-form/:_id/edit',
            name: 'SecurityFormEdit',
            component: require('@/pages/SecurityFormPage')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
