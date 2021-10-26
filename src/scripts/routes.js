import Login from './components/Login'
import ResetPassword from './components/ResetPassword'
import Dashboard from './components/Dashboard'
import Absen from './components/Absen'
import helpers from './helpers'

export default [
    {
        name:'Dashboard',
        path: '/', 
        component: Dashboard,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(!auth)
                next({name:'Login'})
            else
                next()
        },
        meta: {
            title: 'Dashboard - E-Gov Labura'
        }
    },
    {
        name:'Login',
        path: '/login', 
        component: Login,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(auth)
                next({name:'Dashboard'})
            else
                next()
        },
        meta: {
            title: 'Login - E-Gov Labura'
        }
    },
    {
        name:'ResetPassword',
        path: '/reset-password', 
        component: ResetPassword,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(auth)
                next({name:'Dashboard'})
            else
                next()
        },
        meta: {
            title: 'Reset Password - E-Gov Labura'
        }
    },
    {
        name:'Absen',
        path: '/absen/:type', 
        component: Absen,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(!auth)
                next({name:'Login'})
            else
                next()
        },
        meta: {
            title: 'Absen - E-Gov Labura'
        }
    }
    
]