// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   component: () => import('@/views/HomeView.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'Default',
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
  //     },
  //   ],
  // },
  {
    path: '/cidades',
    component: () => import('@/views/CidadesView.vue'),
    // children: [
    //   {
    //     path: '',
    //     name: 'Cidades',
    //     component: () => import(/* webpackChunkName: "home" */ '@/views/CidadesView.vue'),
    //   },
    // ],
  },
  {
    path: '/prefeituras',
    component: () => import('@/views/PrefeiturasView.vue'),
    // children: [
    //   {
    //     path: '',
    //     name: 'Prefeituras',
    //     component: () => import(/* webpackChunkName: "home" */ '@/views/PrefeiturasView.vue'),
    //   },
    // ],
  },
  {
    path: '/pagamentos',
    component: () => import('@/views/PagamentosView.vue'),
    // children: [
    //   {
    //     path: '',
    //     name: 'Pagamentos',
    //     component: () => import(/* webpackChunkName: "home" */ '@/views/PagamentosView.vue'),
    //   },
    // ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
