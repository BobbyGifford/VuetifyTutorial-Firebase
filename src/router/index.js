import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import About from '@/components/About'
import ItemDetails from '@/components/PortList/ItemDetails'
import FullList from '@/components/PortList/FullList'
import AddItem from '@/components/PortList/AddItem'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
import Guard from './guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/vue',
      name: 'Vue',
      component: Hello
    },
    {
      path: '/listItem/:id',
      props: true,
      name: 'ListItem',
      component: ItemDetails
    },
    {
      path: '/fullList',
      name: 'FullList',
      component: FullList
    },
    {
      path: '/addItem',
      name: 'Add Item',
      component: AddItem,
      beforeEnter: Guard
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    }
  ],
  mode: 'history'
})
