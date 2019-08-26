import Vue from 'vue'
import Router from 'vue-router'
import GameConsole from '@/components/GameConsole'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'GameConsole',
      component: GameConsole
    }
  ]
})
