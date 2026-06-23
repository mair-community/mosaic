import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Landing from '@/views/Landing.vue'
import Home from '@/views/Home.vue'
import Ranking from '@/views/Ranking.vue'
import About from '@/views/About.vue'
import AddYours from '@/views/AddYours.vue'
import Contribute from '@/views/Contribute.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Landing
      },
      {
        path: '/projects',
        name: 'Projects',
        component: Home
      },
      {
        path: '/ranking',
        name: 'Ranking',
        component: Ranking
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/submit',
        name: 'Submit',
        component: AddYours
      },
      {
        path: '/contribute',
        name: 'Contribute',
        component: Contribute
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
