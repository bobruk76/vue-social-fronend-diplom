export default [
  {
    path: '/',
    redirect: {
      name: 'News'
    }
  },
  {
    path: '/news',
    name: 'News',
    meta: {
      layout: 'main',
      title: 'Новости'
    },
    component: () => import('@/pages/User/News.vue')
  },
  {
    path: '/im',
    name: 'Im',
    meta: {
      layout: 'main',
      title: 'Сообщения'
    },
    component: () => import('@/pages/User/Im.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      layout: 'main',
      title: 'Моя Страница'
    },
    component: () => import('@/pages/User/Profile.vue')
  },
  {
    path: '/profile/:id',
    name: 'ProfileId',
    meta: {
      layout: 'main',
      title: 'Профиль пользователя'
    },
    component: () => import('@/pages/User/ProfileId.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      layout: 'main',
      title: 'Настройки'
    },
    component: () => import('@/pages/User/Settings.vue')
  },
  {
    path: '/friends',
    name: 'Friends',
    meta: {
      layout: 'main',
      title: 'Друзья'
    },
    component: () => import('@/pages/User/Friends.vue')
  },
  {
    path: '/friends/find',
    name: 'FriendsFind',
    meta: {
      layout: 'main',
      title: 'Поиск друзей'
    },
    component: () => import('@/pages/User/FriendsFind.vue')
  },
  {
    path: '/search',
    name: 'Search',
    meta: {
      layout: 'main',
      title: 'Поиск'
    },
    component: () => import('@/pages/User/Search.vue')
  },
  {
    path: '/push',
    name: 'Push',
    meta: {
      layout: 'main',
      title: 'Уведомления'
    },
    component: () => import('@/pages/User/Push.vue')
  }
]
