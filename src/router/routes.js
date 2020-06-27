import Backstage from '../views/Backstage'
import UserInfo from '../views/Backstage/UserInfo'
import Login from '../views/Backstage/Login'
import addBlog from '../views/Backstage/Blog/addBlog.vue'
import setBlog from '../views/Backstage/Blog/setBlog.vue'
import delBlog from '../views/Backstage/Blog/delBlog.vue'
import Blogs from '../views/Blogs'
import User from '../views/User'
import BlogInfo from '../views/BlogInfo'
import Favorite from '../views/Favorite'

export default [
  {
    path: '/blogs',
    component: Blogs,
  },
  {
    path: '/blogInfo/:blogid',
    component: BlogInfo,
    meta: {
      isHide: true
    },
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: '/favorite',
    component: Favorite,
  },
  {
    path: '/tiantian',
    component: Backstage,
    meta: {
      isHide: true
    },
    children: [
      {
        path: '/tiantian/userinfo',
        component: UserInfo,
        meta: {
          isHide: true
        },
      },
      {
        path: '/tiantian/addblog',
        component: addBlog,
        meta: {
          isHide: true
        },
      },
      {
        path: '/tiantian/setblog',
        component: setBlog,
        meta: {
          isHide: true
        },
      },
      {
        path: '/tiantian/delblog',
        component: delBlog,
        meta: {
          isHide: true
        },
      },
      {
        path: '',
        redirect: '/login',
        meta: {
          isHide: true
        },
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHide: true
    },
    beforeEnter: (to, from, next) => {
      const name = window.localStorage.getItem('userName')
      if (name) {
        next('/tiantian/userinfo')
      } else {
        next()
      }
    }
  },
  {
    path: '',
    redirect: '/blogs',
  },
  {
    path: '/index.html',
    redirect: '/blogs',
  }
]