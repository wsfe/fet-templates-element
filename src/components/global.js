import { GridStore, Grid } from './grid'

const componentList = {
  GridStore,
  Grid
}

export default {
  install: (Vue, opts = {}) => {
    Object.keys(componentList).forEach((key) => {
      Vue.component(key, componentList[key])
    })
  }
}
