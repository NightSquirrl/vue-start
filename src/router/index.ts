import { createMemoryHistory, createRouter } from 'vue-router'

function Sroutes(url: string, options = {}) {
  const files = import.meta.glob('/src/**/*.vue')
  const route = []
  for (const key in files) {
    const element = files[key]
    const fileName = key
      .replace(new RegExp(url, 'g'), '/')
      .replace(/(\.\/|\.vue)/g, '')
      .replace(new RegExp('/src', 'g'), '')
      .replace(new RegExp('/views', 'g'), '')
      .replace(new RegExp('/components', 'g'), '')
    if (fileName !== '/App') {
      route.push({
        path: fileName,
        name: fileName,
        component: element,
        meta: options,
      })
    }
  }
  return route
}
const autoRoute = Sroutes('/views/HomeView')

const router = createRouter({
  history: createMemoryHistory(),
  routes: autoRoute,
})

export default router
