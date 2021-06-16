import Vue from 'vue';
import Router from 'vue-router';

import { Role } from './Role';


import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import HistoryPage from '../history/HistoryPage'

import AdminPage from '../admin/AdminPage'

import PasswordPage from '../PasswordPage/PasswordPage'




Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/passwort', component: PasswordPage },
    { path: '/register', component: RegisterPage },
    { path: '/history', component: HistoryPage  },
    { path: '/verwaltung', component: AdminPage, meta: { authorize: [Role.Admin] }  },
    
    

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  const { authorize } = to.meta;
    const currentUser = JSON.parse(localStorage.getItem('user'));;

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if (authorize) {
  
    if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return next({ path: '/login', query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
        // role not authorised so redirect to home page
        return next({ path: '/' });
    }
}

  next();
})