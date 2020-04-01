<template>
  <div>
    hello pageA
  </div>
</template>

<script>
import store from './store'
import { mapGetters } from 'vuex'
export default {
  name: 'PageA',
  computed: {
    ...mapGetters('pageA', ['aaa', 'bbb', 'ccc'])
  },
  // 局部动态使用store示例
  beforeRouteEnter (to, from, next) {
    store.install()
    next()
  },
  beforeRouteLeave (to, from, next) {
    store.uninstall()
    next()
  }
}
</script>

<style scoped>

</style>
