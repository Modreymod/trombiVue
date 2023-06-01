import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'À propos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/planningType',
    name: 'PlanningType',
    // Division de code au niveau de la route
    // Cela génère un chunk séparé (about.[hash].js) pour cette route
    // qui est chargé de manière paresseuse lorsque la route est visitée.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlanningType.vue')
  },
  {
    path: '/planningForm',
    name: 'PlanningForm',
    // Division de code au niveau de la route
    // Cela génère un chunk séparé (about.[hash].js) pour cette route
    // qui est chargé de manière paresseuse lorsque la route est visitée.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlanningForm.vue')
  },
  {
    path: '/employeApi',
    name: 'EmployeApi',
    // Division de code au niveau de la route
    // Cela génère un chunk séparé (about.[hash].js) pour cette route
    // qui est chargé de manière paresseuse lorsque la route est visitée.
    component: () => import(/* webpackChunkName: "about" */ '../views/EmployeApi.vue')
  },
  {
    path: '/employeForm',
    name: 'EmployeForm',
    // Division de code au niveau de la route
    // Cela génère un chunk séparé (about.[hash].js) pour cette route
    // qui est chargé de manière paresseuse lorsque la route est visitée.
    component: () => import(/* webpackChunkName: "about" */ '../views/EmployeForm.vue')
  },
  {
    path: '/employeList',
    name: 'EmployeList',
    // Division de code au niveau de la route
    // Cela génère un chunk séparé (about.[hash].js) pour cette route
    // qui est chargé de manière paresseuse lorsque la route est visitée.
    component: () => import(/* webpackChunkName: "about" */ '../views/EmployeList.vue')
  },
  {
    path: '/employePlanning',
    name: 'EmployePlanning',
    // Division de code au niveau de la route
    // Cela génère un chunk séparé (about.[hash].js) pour cette route
    // qui est chargé de manière paresseuse lorsque la route est visitée.
    component: () => import(/* webpackChunkName: "about" */ '../views/EmployePlanning.vue')
  },
  {
    path: '/employeModif',
    name: 'EmployeModif',
    // Division de code au niveau de la route
    // Cela génère un chunk séparé (about.[hash].js) pour cette route
    // qui est chargé de manière paresseuse lorsque la route est visitée.
    component: () => import(/* webpackChunkName: "about" */ '../views/EmployeModif.vue')
  },
  {
    path: '/element/:id',
    name: 'Element',
    component: () => import(/* webpackChunkName: "about" */ '../views/Element.vue'),
    children: [
      {
        path: 'properties',
        component: () => import('../views/ElementProperties.vue')
      },
      {
        path: 'informations',
        component: () => import('../views/ElementInformations.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
