import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/vegetable',
    name: 'vegetable',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/vegetable/Vegetable.vue'
      ),
    meta: {
      title: '菜品'
    },
    children: [
      {
        path: 'list',
        name: 'vegetable.list',
        component: () => import('../views/vegetable/VegetableList.vue'),
        meta: {
          title: '菜品列表'
        }
      },
      {
        path: 'order',
        name: 'vegetable.order',
        component: () => import('../views/vegetable/VegetableOrder.vue'),
        meta: {
          title: '我的订单'
        }
      }
    ]
  }
]

export default routes
