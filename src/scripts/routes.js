import Login from './components/Login'
import ResetPassword from './components/ResetPassword'
import Dashboard from './components/Dashboard'
import Notification from './components/Notification'

import Absen from './components/absensi/Absen'
import ListAbsenLuar from './components/absensi/ListAbsenLuar'
import ListAbsenLuarBawahan from './components/absensi/ListAbsenLuarBawahan'
import LogAbsen from './components/absensi/LogAbsen'

import IzinKerja from './components/izinkerja/IzinKerja'
import IzinKerjaBawahan from './components/izinkerja/IzinKerjaBawahan'
import BuatIzinKerja from './components/izinkerja/BuatIzinKerja'

import Profile from './components/Profile'
import Bantuan from './components/Bantuan'
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
            title: 'Dashboard'
        }
    },
    {
        name:'Notification',
        path: '/notifications', 
        component: Notification,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(!auth)
                next({name:'Login'})
            else
                next()
        },
        meta: {
            title: 'Notifications'
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
            title: 'Login'
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
            title: 'Reset Password'
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
            title: 'Absen'
        }
    },
    {
        name:'LogAbsen',
        path: '/log-absen', 
        component: LogAbsen,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(!auth)
                next({name:'Login'})
            else
                next()
        },
        meta: {
            title: 'Log Absen'
        }
    },
    {
        name:'ListAbsenLuar',
        path: '/absen-luar-lokasi', 
        component: ListAbsenLuar,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(!auth)
                next({name:'Login'})
            else
                next()
        },
        meta: {
            title: 'Absen Luar Lokasi'
        }
    },
    {
        name:'ListAbsenLuarBawahan',
        path: '/absen-luar-lokasi-bawahan', 
        component: ListAbsenLuarBawahan,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(!auth)
                next({name:'Login'})
            else
                next()
        },
        meta: {
            title: 'Absen Bawahan'
        }
    },
    {
        name:'IzinKerja',
        path: '/izin-kerja', 
        component: IzinKerja,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(!auth)
                next({name:'Login'})
            else
                next()
        },
        meta: {
            title: 'Izin Kerja'
        }
    },
    {
        name:'BuatIzinKerja',
        path: '/izin-kerja/create', 
        component: BuatIzinKerja,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(!auth)
                next({name:'Login'})
            else
                next()
        },
        meta: {
            title: 'Buat Izin Kerja'
        }
    },
    {
        name:'IzinKerjaBawahan',
        path: '/izin-kerja/bawahan', 
        component: IzinKerjaBawahan,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(!auth)
                next({name:'Login'})
            else
                next()
        },
        meta: {
            title: 'Izin Kerja Bawahan'
        }
    },
    {
        name:'Profile',
        path: '/profile', 
        component: Profile,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(!auth)
                next({name:'Login'})
            else
                next()
        },
        meta: {
            title: 'Profile'
        }
    },
    {
        name:'Bantuan',
        path: '/bantuan', 
        component: Bantuan,
        beforeEnter(to, from, next) {
            var auth = helpers.auth()
            if(!auth)
                next({name:'Login'})
            else
                next()
        },
        meta: {
            title: 'Bantuan'
        }
    }
    
]